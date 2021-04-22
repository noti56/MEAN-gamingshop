const { Schema, model } = require('mongoose');
const { reqString } = require('../config/reqString');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    finalPrice: { type: Number, required: true },
    //delivery
    city: reqString,
    street: reqString,
    date_delivery: { type: Date, required: true },
    date_ordering: { type: Date, required: true, default: Date.now },
    lastDigits: reqString

})

const Order = model('orders', orderSchema)

module.exports = { Order }


