const express = require('express')
const router = express.Router()
const { login } = require('../controllers/login')

router.post('/auth', (req, res) => {
    login(req, res)
})

module.exports = router