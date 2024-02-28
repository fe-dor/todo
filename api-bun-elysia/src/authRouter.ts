import Router, {error, t} from 'elysia';
import Joi from 'joi';
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
                error: "Username issue",
                status: 441
            }),
            email: t.String({
                format: 'email',
                error: "Email issue",
                status: 442
            }),
            password: t.String({
                minLength: 5,
                maxLength: 15,
                error: "Password issue",
                status: 443 //недоделано!! коды не работают
            })
        })
    }
);
/*router.post('/login', controller.login)
router.get('/data', controller.getData)*/

export default router