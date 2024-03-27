import {Schema, model} from 'mongoose'

const Group = new Schema({
    color: {type: String, required: true},
    name: {type: String, required: true},
    icon: {type: String, required: true},
    notes: [{type: Object, ref: "Notes"}]
})

export default model('Group', Group)