import User from './models/User';
import Role from './models/Role';
import bcrypt from 'bcrypt-ts';
import { jwt } from '@elysiajs/jwt';
import {Types} from "mongoose";
require('dotenv').config();
const secret = process.env.JWT_SECRET;
function generateAccessToken(id:  Types.ObjectId, roles: string[]) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '1h'});
}

class AuthController {
    async registration(req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; errors?: any; }): void; new(): any; }; }; }) {
        try {
            const {username, password, email} = req.body;
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'An account is already linked to this email'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole  = await Role.findOne({value: "USER"})
            const user = new User({
                email,
                username,
                password: hashPassword,
                roles: [userRole !== null && typeof userRole.value === 'string' ? userRole.value : 'USER']
            })
            await user.save()
            return res.status(200).json({message: "User registered successfully"})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req: { body: { password: any; email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => any; }) {
        try {
            const {password, email} = req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: 'User with this email not found'})
            }
            const isValid = bcrypt.compareSync(password, user.password)
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

    async getData(req: any, res: { json: (arg0: string) => void; }) {
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