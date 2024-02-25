import Router from 'elysia';
import Joi from 'joi';
const router = new Router()
import controller from './authController';

const fieldValidationSchema = Joi.object({
    password: Joi.string().min(6).max(15).message("The password length must be more than 6 and less than 15 characters").required(),
    username: Joi.string().min(3).max(12).message("The username length must be more than 3 and less than 12 characters").required()
});

router.post(
    '/registration',
    (req: { body: any; }, res: any) => {
        const { error } = fieldValidationSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        return controller.registration(req, res)
    }
    );
router.post('/login', controller.login)
router.get('/data', controller.getData)

export default router