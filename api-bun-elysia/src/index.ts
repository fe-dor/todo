import {Elysia} from "elysia";
import { swagger } from '@elysiajs/swagger'
import mongoose from 'mongoose';
import authRouter from "./authRouter";
import {jwt} from "@elysiajs/jwt";
import { cookie } from '@elysiajs/cookie';
import.meta.require

const PORT: string = typeof Bun.env.PORT === 'string' ? Bun.env.PORT : '';
const mongoUri: string = typeof Bun.env.MONGO_URI === 'string' ? Bun.env.MONGO_URI : '';
const secretJwt: string = typeof Bun.env.JWT_SECRET === 'string' ? Bun.env.JWT_SECRET : '';


const app = new Elysia()

app.use(authRouter)
app.use(swagger({
    path: '/swagger'
}))
app.use(
    jwt({
        name: 'jwt',
        // This should be Environment Variable
        secret: secretJwt,
    })
)
.use(cookie())


try {
    await mongoose.connect(mongoUri)
    app.listen(PORT, () => console.log(`🦊 server started on port ${PORT}`))
} catch (e) {
    console.error(e)
}
