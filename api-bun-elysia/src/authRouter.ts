import Router from 'elysia';
import Joi from 'joi';
const router = new Router()
import controller from './authController';
import { t } from "elysia";

const fieldValidationSchema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
    username: Joi.string().min(3).max(12).required()
});

router.post(
    '/registration',
    (req: { body: any; }, res: any) => {
        const { error } = fieldValidationSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        controller.registration(req, res)
    }
    );
router.post('/login', controller.login)
router.get('/data', controller.getData)

export default router