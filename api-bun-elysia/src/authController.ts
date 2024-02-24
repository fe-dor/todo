import User from './models/User';
import Role from './models/Role';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const {validationResult} = require('express-validator');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '1h'});
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password, email} = req.body;
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'An account is already linked to this email'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole  = await Role.findOne({value: "USER"})
            const user = new User({email, username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.status(200).json({message: "User registered successfully"})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            const {password, email} = req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: 'User with this email not found'})
            }
            const isValid = await bcrypt.compareSync(password, user.password)
            if (!isValid) {
                return res.status(400).json({message: 'Invalid password'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json(token)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getData(req, res) {
        try {
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})
            const userAdmin = new User({
                email: "tvoya.mama@gmail.com",
                username: "tvoya_mama",
                password: "fat123456",
                roles: [userRole.value]
            });
            /*await userRole.save()
            await adminRole.save()*/
            await userAdmin.save()
            res.json("server work")
        } catch (e) {

        }
    }
}

export default new AuthController()