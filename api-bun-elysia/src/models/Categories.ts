import {Schema, model, Types} from 'mongoose'

const Categories = new Schema({
    userId: {type: Types.ObjectId, required: true},
    categories: [{
        type: {
            color: {type: String, required: true},
            name: {type: String, required: true},
            icon: {type: String, required: true}
        },
        required: true
    }]
})

export default model('Categories', Categories)
