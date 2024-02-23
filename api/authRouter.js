const Router = require('express')
const router = Router()
const controller = require('./authController')
const {check} = require("express-validator");

router.post(
    '/registration',
    [
        check('username', 'Username cannot be empty').notEmpty(),
        check('password', 'Password cannot be empty').notEmpty(),
        check('password', 'Password must be more than 6 and less than 12 characters').isLength({
            min: 6,
            max: 12
        })
    ],
    controller.registration)
router.post('/login', controller.login)
router.get('/data', controller.getData)

module.exports = router