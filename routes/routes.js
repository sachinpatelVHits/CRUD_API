const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

router.get('/get', controller.get)
router.get('/search/:key', controller.get)
router.post('/post', controller.post)
router.put('/put/:_id', controller.put)
router.delete('/delete/:_id', controller.delete)


module.exports = router