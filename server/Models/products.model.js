const { Schema, model } = require('mongoose')
const { reqString } = require('../config/reqString.js')



const categorySchema = new Schema({
    name: reqString
})

const productSchema = new Schema({

    name: reqString,
    price: { type: Number, required: true },
    img_url: reqString,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }

})

const Category = model('categories', categorySchema)
const Product = model('products', productSchema)

module.exports = { Category, Product }