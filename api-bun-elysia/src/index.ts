import {Elysia} from "elysia";
import { swagger } from '@elysiajs/swagger'
import mongoose from 'mongoose';
import authRouter from "./router";
import { cors } from '@elysiajs/cors'
import { bearer } from '@elysiajs/bearer'

import {jwt} from "@elysiajs/jwt";
import { cookie } from '@elysiajs/cookie';
import router from "./router";
import.meta.require

const PORT: string = typeof Bun.env.PORT === 'string' ? Bun.env.PORT : '';
const mongoUri: string = typeof Bun.env.MONGO_URI === 'string' ? Bun.env.MONGO_URI : '';
const secretJwt: string = typeof Bun.env.JWT_CODE === 'string' ? Bun.env.JWT_CODE : '';


const app = new Elysia()

app.use(authRouter)
app.use(swagger({
    path: '/swagger'
}))

/*app.onAfterHandle(({ request, set }) => {
    // Only process CORS requests
    if (request.method !== "OPTIONS") return;

    const allowHeader = set.headers["Access-Control-Allow-Headers"];
    if (allowHeader === "*") {
        set.headers["Access-Control-Allow-Headers"] =
            request.headers.get("Access-Control-Request-Headers") ?? "";
    }
}).use(cors())*/

//added to pass cors...
app.onAfterHandle(({ request, set }) => {
    // Only process CORS requests
    if (request.method !== "OPTIONS") return;

    const allowHeader = set.headers["Access-Control-Allow-Headers"];
    if (allowHeader === "*") {
        set.headers["Access-Control-Allow-Headers"] =
            request.headers.get("Access-Control-Request-Headers") ?? "";
    }
})
.use(cors())

app.use(bearer())

app.onError(({ code, error }) => {
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
            case '473': {
                message = 'Auth code incorrect format'
                break
            }
        }
        return new Response(message, {
            status: +error.message
        })
    }
})


try {
    await mongoose.connect(mongoUri)
    app.listen(PORT, () => console.log(`🦊 server started on port ${PORT}`))
    console.log(secretJwt)
} catch (e) {
    console.error(e)
}
