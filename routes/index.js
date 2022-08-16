const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const authRouter = require('./auth')
const ordersRouter = require('./orders')


router.use('/users', usersRouter)// peticion http request get /users GET:result= [{},{}]
router.use('/auth', authRouter)
router.use('/orders', ordersRouter)


module.exports= router