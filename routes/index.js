const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const authRouter = require('./auth')
const productsRouter = require('./products')


router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/products', productsRouter)

module.exports= router