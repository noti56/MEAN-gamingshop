const { Schema, model } = require('mongoose')


const cartProductSchema = new Schema({
    prod_id: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: { type: Number, required: true }
});


const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    dateOpened: { type: Date, default: Date.now },
    isOpened: { type: Boolean, default: true },
    products: [cartProductSchema]

})



const Cart = model('carts', cartSchema)
module.exports = { Cart }