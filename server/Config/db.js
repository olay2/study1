const mongoose = require('mongoose')

const connectBD = async () => {
    try {
        //code
        await mongoose.connect('mongodb://localhost:27017/test')
        console.log('connection successful')
    }catch(err) {
        //error 
        console.log(err)
    }
}
 
module.exports = connectBD