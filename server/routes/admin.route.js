const { Product, Category } = require('../Models/products.model')

const router = require('express').Router()

//new Product
router.post('/', async (req, res) => {
    try {

        //בקליינט לשלוח לפי סלקט ובקkיינט נפלטר את שהם של הקטגוריה להיות איידי 💪
        const { name, price, img_url, category } = req.body
        if (!name || !price || !img_url || !category) return res.status(400).json({ err: true, msg: `missing some info ` })

        const obj = { name, price, img_url, category }
        const newProduct = await Product.insertMany(obj)

        res.status(201).json({ err: false, msg: 'your item has been added', newProduct })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})


router.put('/', async (req, res) => {
    try {
        const { name, price, img_url, category, _id } = req.body
        if (!name || !price || !img_url || !category || !_id) return res.status(400).json({ err: true, msg: `missing some info ` })
        const obj = { name, price, img_url, category }
        const response = await Product.updateOne({ _id }, obj)
        const updatedProduct = await Product.findById(_id)
        res.status(202).json({ err: false, msg: 'updated', updatedProduct })
    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})



module.exports = router