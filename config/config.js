const mongoose = require('mongoose')

const config = mongoose.connect('mongodb://localhost:27017/crud_user').then(()=>{
    console.log('Connected to Database');
}).catch((err)=>{
    console.log('Unable to Connect Database')
})
module.exports = config