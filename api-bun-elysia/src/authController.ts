import transporter from "./mailTransporter";
import UserTemp from "./models/UserTemp";
import User from './models/User';
import Role from './models/Role';
import { hashSync, compareSync } from 'bcrypt-ts';
import * as crypto from "crypto";
import.meta.require
import { jwt } from '@elysiajs/jwt';
import {Types} from "mongoose";

const gmail_user = Bun.env.GMAIL_USER
const secret = Bun.env.JWT_SECRET;

/*function generateAccessToken(id:  Types.ObjectId, roles: string[]) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '1h'});
}*/


// Функция для генерации случайного кода
function generateRandomCode(length: number) {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
}

async function deleteUserTempById(userId: string) {
    try {
        const result = await UserTemp.findByIdAndDelete(userId);
        if (!result) {
            console.log('Пользователь не найден');
        } else {
            console.log('Пользователь успешно удалён');
        }
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
    }
}


class AuthController {
    async registration(body: {username: string, password: string, email: string}) {
        try {
            const {username, password, email} = body;
            const candidate = await User.findOne({email})
            if (candidate) {
                return new Response('An account is already linked to this email', {
                    status: 491
                })
            }
            const candidate_temp = await UserTemp.findOne({email})
            if (candidate_temp) {
                await deleteUserTempById(candidate_temp._id.toString())
            }
            const code = generateRandomCode(6);
            const hashCode = hashSync(code, 8);
            const hashPassword = hashSync(password, 7);
            const userTemp = new UserTemp({
                email: email,
                username: username,
                password: hashPassword,
                regCode: hashCode,
            })
            await userTemp.save()
            // Настройте сообщение
            const mailOptions = {
                from: gmail_user,
                to: `${email}`,
                subject: `Hello, ${username}!`,
                html: '<div>' +
                    '<h1 style="font-size: 18px">Welcome to my ToDo app!</h1>' +
                    `<p style="font-size: 14px">Your activation code: </p>` +
                    `<p style="text-align: center; font-size: 22px">${code}</p>` +
                    '</div>'
            };
            // Отправьте электронное письмо
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return new Response("Send email issue", {
                        status: 500
                    })
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return new Response("Temporary user created successfully", {
                status: 200
            })

            /*const userRole  = await Role.findOne({value: "USER"})
            const user = new User({
                email,
                username,
                password: hashPassword,
                roles: [userRole !== null && typeof userRole.value === 'string' ? userRole.value : 'USER']
            })*/


        } catch (e) {
            console.log(e);
            return new Response('Registration error', {
                status: 400
            })
        }
    }

    async confirmation(body: {email: string, code: string}) {
        try {
            const {email, code} = body;
            const candidate = await UserTemp.findOne({email})
            if (!candidate) {
                return new Response('This email is not awaiting confirmation', {
                    status: 480
                })
            }
            const isValid = compareSync(code, candidate.regCode)
            if (!isValid) {
                return new Response('Wrong code', {
                    status: 481
                })
            }
            const user = new User({
                email: candidate.email,
                username: candidate.username,
                password: candidate.password,
                roles: ['USER']
            })
            await user.save()
            await deleteUserTempById(candidate._id.toString())
            return new Response('Confirmation successful', {
                status: 200
            })
        } catch (e) {
            console.log(e);
            return new Response('Registration error', {
                status: 400
            })
        }
    }

   /* async login(req: { body: { password: any; email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => any; }) {
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
    }*/

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