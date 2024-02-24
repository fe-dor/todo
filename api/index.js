const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
require('dotenv').config();
const PORT = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(mongoUri)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()