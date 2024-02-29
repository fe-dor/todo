import Router, {t} from 'elysia';

const router = new Router()
import controller from './authController';

router.post(
    '/registration',
    ({body}) => {
        return controller.registration(body)
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
).onError(({ code, error }) => {
    if (code === 'VALIDATION') {
        let message = ''
        switch (error.message) {
            case '470': {
                message = 'Username incorrect format'
                break
            }
            case '471': {
                message = 'Email incorrect format'
                break
            }
            case '472': {
                message = 'Password incorrect format'
                break
            }
        }
        return new Response(message, {
            status: +error.message
        })
    }
});
router.post('/confirmation',
    ({body}) => {
        return controller.confirmation(body)
    }, {
        body : t.Object({
            email: t.String({
                format: 'email',
                error: "Email is incorrect"
            }),
            code: t.String({
                minLength: 6,
                maxLength: 6,
                error: "Code is wrong"
            })
        })
    })
/*router.post('/login', controller.login)
router.get('/data', controller.getData)*/

export default router