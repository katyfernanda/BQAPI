const express = require('express')
const router = express.Router()
const { registerUser } = require('../controllers/users')


router.post('/', (req, res) => { // antiguo '/register'
    registerUser(req, res)
})



module.exports = router