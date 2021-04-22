const mongoose = require('mongoose');

const connectToDb = async () => {

    
    try {

        await mongoose.connect('this link is private sorry ! ', {
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
