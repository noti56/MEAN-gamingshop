const router = require('express').Router();

const { User } = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('email-validator')


router.post('/register_first', async (req, res) => {
    try {
        const { idUser, email, password } = req.body

        if (!idUser || !email || !password) return res.status(400).json({ err: true, msg: `missing some info needed for registration` })

        // finding if there is a user like this
        const userDB_id = await User.findOne({ idUser })

        let ifIsMail = await validator.validate(email)
        if (!ifIsMail) return res.status(400).json({ err: true, msg: `Email is not a valid email address` })

        const userDB_email = await User.findOne({ email })

        if (userDB_id || userDB_email) return res.status(400).json({ err: true, msg: `user already exist` })
        //==============


        res.status(201).json({ err: false, msg: `lvl 1 registration finished` })


    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }

});
//2
router.post('/register_sec', async (req, res) => {
    try {
        const { name, lastName, idUser,
            email, password, city, street } = req.body
        if (!name || !lastName || !idUser ||
            !email || !password || !city || !street) return res.status(400).json({ err: true, msg: `missing some info needed for registration` })


        //==============

        let hashedPassword = await bcrypt.hash(password, 10)

        let obj = {
            name, lastName, idUser,
            email, password: hashedPassword, city, street
        }
        const newUser = await new User(obj).save()
        newUser.password = 'not so fast amigo'
        res.status(201).json({ err: false, msg: `user added sucssesfuly`, newUser })


    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }

});




router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ err: true, msg: `missing some info` })
        let userDB = await User.findOne({ email })

        if (!userDB) return res.status(400).json({ err: true, msg: `incorrect username` })
        let isMatched = await bcrypt.compare(password, userDB.password)
        if (!isMatched) return res.status(400).json({ err: true, msg: `incorrect password` })

        const id = userDB._id // wtf is this

        const token = jwt.sign({ id, name: userDB.name, isAdmin: userDB.isAdmin, city: userDB.city, street: userDB.street }, process.env.secret)
        userDB.password = 'nice try'
        res.status(202).json({ err: false, msg: 'logged in', userDB, token })


    } catch (error) {
        console.error(error)
        res.json({ err: true, error })
    }
})


module.exports = router;