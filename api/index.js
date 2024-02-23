const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://parashchenkofedor:dOdOvG0T1qXqJxtE@clustertodo.ilm7asb.mongodb.net/todo?retryWrites=true&w=majority&appName=ClusterToDo")
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()