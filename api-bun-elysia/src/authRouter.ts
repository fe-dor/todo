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
                error: "Username issue"
            }),
            email: t.String({
                format: 'email',
                error: "Email issue"
            }),
            password: t.String({
                minLength: 5,
                maxLength: 15,
                error: "Password issue"
            })
        })
    }
);
/*router.post('/login', controller.login)
router.get('/data', controller.getData)*/

export default router