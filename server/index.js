const express = require('express')
const app = express()
const { connectToDb } = require('./config/dbConnection')
const { vtUser, adminVer } = require('./Vts')



app.use(require('cors')())
app.use(express.json())
require('dotenv').config()

//==========
//==========
//ROUTES
//  authtintacation =>
app.use('/auth', require('./routes/auth.route'))
app.use('/welcome', require('./routes/welcome.route'))

//shop main
app.use('/main', vtUser, require('./routes/main.route'))
app.use('/cart', vtUser, require('./routes/cart.route'))
app.use('/order', vtUser, require('./routes/order.route'))

//===========
//ADMIN
app.use('/admin', vtUser, adminVer, require('./routes/admin.route'))

//===========
//===========
connectToDb()


app.listen(1000, () => console.log('🤘 rocking 1000 ! 🤘'))