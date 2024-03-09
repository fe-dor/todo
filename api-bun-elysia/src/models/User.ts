import {Schema, model} from 'mongoose'

const User = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String, required: false},
    roles: [{type: String, ref: 'Role'}]
})

export default model('User', User)