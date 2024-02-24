import { Elysia } from "elysia";

import mongoose from 'mongoose';
import.meta.require

const PORT: string = typeof Bun.env.PORT === 'string' ? Bun.env.PORT : '';
const mongoUri: string = typeof Bun.env.MONGO_URI === 'string' ? Bun.env.MONGO_URI : '';


const app = new Elysia()

const start = async () => {
    try {
        await mongoose.connect(mongoUri)
        app.listen(PORT, () => console.log(`🦊 server started on port ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}


start()