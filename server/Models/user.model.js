const { Schema, model } = require('mongoose')
const { reqString } = require('../config/reqString')



const userSchema = new Schema({
    name: reqString,
    lastName: reqString,
    idUser: { type: Number, required: true },
    email: reqString,
    password: reqString,
    city: reqString,
    street: reqString,
    isAdmin: { type: Boolean }

})


const User = model('users', userSchema)

module.exports = { User }




