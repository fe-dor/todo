import transporter from "./mailTransporter";
import UserTemp from "./models/UserTemp";
import User from './models/User';
import Role from './models/Role';
import { hashSync, compareSync } from 'bcrypt-ts';
import { jwt } from "@elysiajs/jwt";
import { cookie } from '@elysiajs/cookie';
import * as crypto from "crypto";
import.meta.require

import {Types} from "mongoose";
import {Elysia} from "elysia";
import ElysiaTypeOptions from "elysia/dist/index-59i0HOI0";

const gmail_user = Bun.env.GMAIL_USER
const secret = Bun.env.JWT_SECRET;
const client_url: string = typeof Bun.env.CLIENT_URL === 'string' ? Bun.env.CLIENT_URL : 'http://localhost:5173';


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
    async registration(body: {username: string, password: string, email: string, photo: string}) {
        try {
            const {username, password, email, photo} = body;
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
            const code = generateRandomCode(12);
            const hashCode = hashSync(code, 8);
            const hashPassword = hashSync(password, 7);
            const userTemp = new UserTemp({
                email: email,
                username: username,
                password: hashPassword,
                regCode: hashCode,
                photo: photo
            })
            await userTemp.save()
            // Настройте сообщение
            const mailOptions = {
                from: gmail_user,
                to: `${email}`,
                subject: `Hello, ${username}!`,
                html: '<div>' +
                    '<h1 style="font-size: 18px">Welcome to my ToDo app!</h1>' +
                    `<p style="font-size: 14px">Your activation link: </p>` +
                    `<link style="text-align: center; font-size: 22px">${client_url}/confirmation?email=${email}&code=${code}</link>` +
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
                photo: candidate.photo,
                roles: ['USER']
            })
            await user.save()
            await deleteUserTempById(candidate._id.toString())
            return user
        } catch (e) {
            console.log(e);
            return new Response('Registration error', {
                status: 400
            })
        }
    }

    async login(body: {password: string, email: string}) {
        try {
            const {password, email} = body;
            const user = await User.findOne({email})
            if(!user){
                return  new Response('User with this email not found', {
                    status: 400
                })
            }
            const isValid = compareSync(password, user.password)
            if (!isValid) {
                return  new Response('Invalid password', {
                    status: 400
                })
            }
            return user;
        } catch (e) {
            console.log(e);
            return new Response('Login error', {
                status: 400
            })
        }
    }

    /*async getData(req: any, res: { json: (arg0: string) => void; }) {
        try {
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})
            const userAdmin = new User({
                email: "tvoya.mama@gmail.com",
                username: "tvoya_mama",
                password: "fat123456",
                roles: [userRole.value]
            });
            /!*await userRole.save()
            await adminRole.save()*!/
            await userAdmin.save()
            res.json("server work")
        } catch (e) {

        }
    }*/
}

export default new AuthController()