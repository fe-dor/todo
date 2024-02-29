import {Elysia} from "elysia";
import { swagger } from '@elysiajs/swagger'
import mongoose from 'mongoose';
import authRouter from "./authRouter";
import.meta.require

const PORT: string = typeof Bun.env.PORT === 'string' ? Bun.env.PORT : '';
const mongoUri: string = typeof Bun.env.MONGO_URI === 'string' ? Bun.env.MONGO_URI : '';


const app = new Elysia()

app.use(authRouter)
app.use(swagger({
    path: '/swagger'
}))
/*app.onError(({ code, error }) => {
    if (code === 'VALIDATION') {
        return new Response(error.message, {
            status: 400
        })
    }
})*/

try {
    await mongoose.connect(mongoUri)
    app.listen(PORT, () => console.log(`🦊 server started on port ${PORT}`))
} catch (e) {
    console.error(e)
}
