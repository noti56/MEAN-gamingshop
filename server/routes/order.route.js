const router = require('express').Router()

const { Order } = require('../Models/order.model');
const { Cart } = require('../Models/cart.model');

// ORDER
router.post('/', async (req, res) => {
    try {
        //         , products, finalPrice 
        // || products || finalPrice
        const { city, street, shippingDate, creditCard, cart_id, finalPrice } = req.body
        if (!city || !street || !shippingDate || !creditCard || !cart_id || !finalPrice) return res.status(400).json({ err: true, msg: `missing some info !` })
        let lastDigits = creditCard.slice(-4)
        await Cart.findByIdAndUpdate(cart_id, { "isOpened": false })
        let cart_DB = Cart.findById(cart_id)
        let order_DB = await Order.insertMany([{
            "user": req.token.id,
            "cart": cart_id,
            finalPrice,
            city,
            street,
            "date_delivery": shippingDate,
            lastDigits
        }])


        res.status(200).json({ err: false, order_DB })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})


// dateHandler
router.get('/:date', async (req, res) => {
    try {

        let orders = await Order.find({ date_delivery: new Date(req.params.date) }, { _id: 0, date_delivery: 1 })
        // orders.sort()
        // let orders = await Order.find({}, { date_delivery: 1 })
        let dateOpened;
        if (orders.length < 3) {
            dateOpened = true
        } else {
            dateOpened = false
        }
        res.status(200).json({ err: false, dateOpened })
    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})




module.exports = router;