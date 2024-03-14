import {Schema, model} from 'mongoose'

const Priority = new Schema({
    value: {type: String, unique: true, required: true, default: "Low"}
})

export default model('Priority', Priority)