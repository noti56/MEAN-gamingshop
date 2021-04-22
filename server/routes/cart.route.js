const router = require('express').Router()
const { Cart } = require('../Models/cart.model')



router.get('/opened-cart', async (req, res) => {
    try {
        // get Opened Cart ONLY!

        // חיפוש האם קיים בדאטה בייס עגלה פתוחה
        let openedCart = await Cart.findOne({ "user": req.token.id, "isOpened": true }).populate('products.prod_id')

        if (openedCart) {

            console.log(openedCart.products)
            let finalPrice = 0;
            openedCart.products.forEach((p, i) => { finalPrice += p.prod_id.price * p.quantity })

            return res.status(200).json({ err: false, msg: 'cart for user ' + req.token.name, openedCart, finalPrice })
        }


        res.status(201).json({ err: false, msg: 'no opened cart ', openedCart: false })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})
router.get('/new-cart', async (req, res) => {

    try {


        let = newOpenedCart = await Cart.insertMany([{ "user": req.token.id }])
        console.log("new cart")

        res.json({ err: false, newOpenedCart: newOpenedCart[0], msg: 'new cart for ' + req.token.name })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})


router.post('/new-item', async (req, res) => {
    try {
        const { prod_id, cart_id, quantity } = req.body
        console.log(prod_id, cart_id, quantity)
        await Cart.findByIdAndUpdate(cart_id,
            { $push: { 'products': { prod_id, cart_id, quantity } } }
        )
        const openedCart = await Cart.findById(cart_id)
        res.status(201).json({ err: false, msg: 'item has been added ', openedCart })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})

// DELETE SINGLE PRODUCT
router.delete('/:cart_id/:product_id', async (req, res) => {
    try {
        let p = await Cart.findByIdAndUpdate(req.params.cart_id,
            { $pull: { products: { prod_id: req.params.product_id } } })


        res.status(200).json({ err: false, msg: 'has been deleted', p })
    }
    catch {
        console.error(error)
        res.json({ err: true, error })
    }
})

// DELETE ALL PRODUCTS FROM CART
router.delete('/:cart_id/', async (req, res) => {
    try {
        let p = await Cart.findByIdAndUpdate(req.params.cart_id, {
            $set: { products: [] }
        })



        res.status(200).json({ err: false, msg: 'has been deleted', p })
    }
    catch {
        console.error(error)
        res.json({ err: true, error })
    }
})


router.put('/close-cart', async (req, res) => {
    try {
        const { cart_id } = req.body
        // const new_cart = await Cart.insertMany([{ "user": req.token.id }])
        const cartToClose = await Cart.findById(cart_id)
        cartToClose.isOpened = false
        await cartToClose.save()

        res.status(202).json({ err: false, msg: 'cart closed ', cartToClose })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})




module.exports = router;