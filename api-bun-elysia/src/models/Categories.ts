import {Schema, model, Types} from 'mongoose'

const Categories = new Schema({
    id: {type: Types.ObjectId, required: true},
    categories: [{type: String, required: true}]
})

export default model('Categories', Categories)
