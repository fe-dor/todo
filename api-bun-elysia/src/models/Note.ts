import {Schema, model, Types} from 'mongoose'

const Note = new Schema({
    id: {type: Types.ObjectId, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    priority: {type: String, required: true, ref: 'Priority'},
    description: { type: String, required: true }
})

export default model('Note', Note)
