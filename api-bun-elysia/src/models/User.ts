import {Schema, model} from 'mongoose'

const User = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String, required: false},
    roles: [{type: String, ref: 'Role'}],
    groups: [{
        color: {type: String, required: true},
        name: {type: String, required: true},
        icon: {type: String, required: true},
        notes: [{
            type: {
                name: {type: String, required: true},
                date: {type: Date, required: true},
                priority: {type: String, required: true},
                description: {type: String, required: true}
            }
        }]
    }]
})

export default model('User', User)