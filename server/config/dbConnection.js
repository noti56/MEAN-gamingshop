const mongoose = require('mongoose');

const connectToDb = async () => {

    //69J2MKS9jqtL6uJ Password to db
    try {

        await mongoose.connect('mongodb+srv://noti56:69J2MKS9jqtL6uJ@gamingshop.prznl.mongodb.net/gamingShop?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('👨‍💻 connected to mongo 👨‍💻')
    } catch (error) {
        console.error(error)
    }


}

module.exports = { connectToDb }