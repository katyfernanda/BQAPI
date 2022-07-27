const express = require('express')
const router = express.Router()
const {createOrder  } = require('../controllers/orders.js')


router.post('/', (req, res) => { 
    createOrder(req, res)
})
router.get('/', (req, res) => {   
})
router.put('/:id', (req, res) => {  
})



module.exports = router