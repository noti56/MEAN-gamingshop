const router = require('express').Router()

const { Product, Category } = require('../Models/products.model')

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()

        res.status(200).json({ err: false, msg: 'here is your categories ', categories })

    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})

// products
router.get('/:category', async (req, res) => {
    try {

        const category_id = await Category.find({ name: req.params.category })

        const products = await Product.find({ category: category_id })

        res.status(200).json({ err: false, msg: `there is your ` + req.params.category, products })


    }
    catch {
        console.error(error)
        res.json({ err: true, error })
    }
})

//SEARCH
router.get('/search/:query', async (req, res) => {
    try {

        const products = await Product.find({ name: { '$regex': req.params.query, '$options': 'i' } })

        res.status(200).json({ err: false, msg: `there is your product!`, products })


    }
    catch {
        console.error(error)
        res.json({ err: true, error })
    }
})














module.exports = router;