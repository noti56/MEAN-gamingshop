const { Order } = require('../Models/order.model')
const { Product } = require('../Models/products.model')
const { Cart } = require('../Models/cart.model')
const { vtUser } = require('../Vts')

const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        let numberOfProducts = await Product.find({}, { "_id": 1 })
        numberOfProducts = numberOfProducts.length
        let numberOfOrders = await Order.find({}, { "_id": 1 })
        numberOfOrders = numberOfOrders.length
        res.json({ numberOfProducts, numberOfOrders })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }

})
router.get('/logged', vtUser, async (req, res) => {
    try {
        // req.token.id

        let cartForUser = await Cart.findOne({ 'user': req.token.id, 'isOpened': true }, { 'dateOpened': 1 })
        let latestPurcahseArr = await Order.find({ 'user': req.token.id }, { 'date_ordering': 1 })
        let latestPurcahse
        // הייתי יכול לקחת את התא האחרון במערך. אבל זה זה יכול לחסוך שגיאות מוזרות 🙈
        latestPurcahseArr.forEach(p => {
            latestPurcahseArr.forEach(o => {
                if (p.date_ordering > o.date_ordering) return latestPurcahse = p
                else return latestPurcahse = o
            })
        });

        res.json({ cartForUser, latestPurcahse })


    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})




module.exports = router;