import Router, {t} from 'elysia';

const router = new Router()
import controllerAuth from './authController';
import controllerProfile from './profileController';

import {jwt} from "@elysiajs/jwt";
import {cookie} from "@elysiajs/cookie";
import user from "./models/User";
const secretJwt: string = typeof Bun.env.JWT_CODE === 'string' ? Bun.env.JWT_CODE : '';



router.post(
    '/registration',
    ({body}) => {
        return controllerAuth.registration(body)
    }, {
        body : t.Object({
            username: t.String({
                minLength: 3,
                maxLength: 12,
                error: "470" //username issue
            }),
            email: t.String({
                format: 'email',
                error: "471"
            }),
            password: t.String({
                minLength: 5,
                maxLength: 15,
                error: "472"
            })
        })
    }
)
router.post('/confirmation',
    ({body}) => {
        return controllerAuth.confirmation(body)
    }, {
        body : t.Object({
            email: t.String({
                format: 'email',
                error: "471"
            }),
            code: t.String({
                minLength: 6,
                maxLength: 6,
                error: "473"
            })
        })
    })
router.use(
    jwt({
        name: 'jwt2',
        exp: '7d',
        // This should be Environment Variable
        secret: secretJwt,
    })
).use(cookie())
.post('/login',  async ({body, jwt2, cookie, setCookie}) => {
    const answer = await controllerAuth.login(body)
    if (answer instanceof Response){
        return answer
    }
    const token = await jwt2.sign({"id": answer._id.toString()})
    console.log(secretJwt)
    console.log(token)
    setCookie('auth', token, {
        httpOnly: true,
        maxAge: 7 * 86400
    });
    return `Sign as ${body.email}!`
}, {
    body : t.Object({
        email: t.String({
            format: 'email',
            error: "471",
        }),
        password: t.String({
            minLength: 5,
            maxLength: 15,
            error: "472",
        })
    })
}).get('/profile', async ({ jwt2, set, cookie: { auth } }) => {
    const profile = await jwt2.verify(auth);

    //console.log(profile)

    if (!profile) {
        set.status = 401;
        return 'Unauthorized';
    }

    const {id} = profile

    return controllerProfile.profile(id);
})

/*router.get('/data', controllerAuth.getData)*/

export default router