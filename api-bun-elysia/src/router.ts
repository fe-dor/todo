import Router, {t} from 'elysia';

const router = new Router()
import controllerAuth from './authController';
import controllerProfile from './profileController';

import {jwt} from "@elysiajs/jwt";
import {cookie} from "@elysiajs/cookie";
import { bearer } from '@elysiajs/bearer'
import user from "./models/User";
const secretJwt: string = typeof Bun.env.JWT_CODE === 'string' ? Bun.env.JWT_CODE : '';
const client_url: string = typeof Bun.env.CLIENT_URL === 'string' ? Bun.env.CLIENT_URL : 'http://localhost:5173';



router.post(
    '/registration',
    ({body, set, request}) => {
        const response = controllerAuth.registration(body)
        set.headers["Access-Control-Allow-Origin"] = client_url
        return response
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
            }),
            photo: t.String({
                error: "473"
            })
        })
    }
)
router.use(
    jwt({
        name: 'jwt2',
        exp: '7d',
        // This should be Environment Variable
        secret: secretJwt,
    })
).use(cookie())

.post('/login',  async ({body, jwt2, cookie, setCookie, set}) => {
    const answer = await controllerAuth.login(body)
    if (answer instanceof Response){
        return answer
    }
    const token = await jwt2.sign({"id": answer._id.toString()})
    console.log(secretJwt)
    console.log(token)

    /*setCookie('auth', token, { //
        httpOnly: false,
        maxAge: 7 * 86400
    });*/
    return {"token" : token}
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
})

.post('/confirmation',
    async ({body, jwt2}) => {
        const answer = await controllerAuth.confirmation(body)
        if (answer instanceof Response){
            return answer
        }

        const token = await jwt2.sign({"id": answer._id.toString()})
        console.log(secretJwt)
        console.log(token)

        /*setCookie('auth', token, { //
            httpOnly: false,
            maxAge: 7 * 86400
        });*/
        return {"token" : token}
    }, {
        body : t.Object({
            email: t.String({
                format: 'email',
                error: "471"
            }),
            code: t.String({
                minLength: 12,
                maxLength: 12,
                error: "473"
            })
        })
    }
)

.use(bearer())
.get('/profile', async ({ bearer, jwt2, set }) => {
    const profile = await jwt2.verify(bearer)

    if (!profile) {
        set.status = 401;
        return 'Unauthorized';
    }

    const {id} = profile

    return controllerProfile.profile(id);
}, {
    beforeHandle({ bearer, set }) {
        if (!bearer) {
            set.status = 400
            set.headers[
                'WWW-Authenticate'
                ] = `Bearer realm='sign', error="invalid_request"`

            return 'Unauthorized'
        }
    }
}
)

/*router.get('/data', controllerAuth.getData)*/

export default router