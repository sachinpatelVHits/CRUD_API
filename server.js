require('./config/config')
const express = require('express')
const app = express()
const router = require('./routes/routes')
app.use(express.json())
app.use('/', router)


app.listen(5000,()=>{
    console.log('Server is Listening on : 5000');
})