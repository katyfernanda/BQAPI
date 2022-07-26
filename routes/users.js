const express = require('express')
const router = express.Router()
const { registerUser, getUsersList, getUser } = require('../controllers/users.js')


router.post('/', (req, res) => { // antiguo '/register'
    registerUser(req, res)
})
router.get('/', (req, res) => {
    getUsersList(req, res)
})
router.put('/:id', (req, res) => {
    getUser(req, res)
})



module.exports = router