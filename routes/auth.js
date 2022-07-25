const express = require('express')
const router = express.Router()
const { login } = require('../controllers/login.js')

router.post('/', (req, res) => {
    login(req, res)
})

module.exports = router