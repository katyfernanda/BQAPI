const express = require('express')
const router = express.Router()
const {createOrder, getOrders, getOrderById, updateOrder  } = require('../controllers/orders.js')


router.post('/', (req, res) => { 
    createOrder(req, res)
})
router.get('/', (req, res) => {
    getOrders(req, res) 
})
router.get('/:id', (req, res) => {
    getOrderById(req, res)
})
router.put('/:id', (req, res) =>{
    updateOrder(req, res)
})



module.exports = router