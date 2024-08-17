const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    detail: {
        type: String
    },
    price: {
        type: Number
    },
    file: {
        type: String,
        default: "NoImage.jpg"
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)