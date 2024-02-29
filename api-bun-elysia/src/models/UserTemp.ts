import {Schema, model} from 'mongoose'

const UserTemp = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    regCode: {type: String, required: true},
    expires: { type: Date, expires: 120, default: Date.now }
})

export default model('UserTemp', UserTemp)