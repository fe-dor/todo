import {Schema, model} from 'mongoose'

const Note = new Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    priority: {type: String, required: true},
    description: {type: String, required: true},
    localDay: {type: String, required: true},
    localTime: {type: String, required: true},
})

export default model('Note', Note)