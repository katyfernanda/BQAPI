const express = require('express')
const router = express.Router()
const { registerUser, allUsers } = require('../controllers/users.js')


router.post('/', (req, res) => { // antiguo '/register'
    registerUser(req, res)
})
router.get('/', (req, res) => {
    allUsers(req, res)
})



module.exports = router