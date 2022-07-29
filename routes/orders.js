const express = require('express')
const router = express.Router()
const {createOrder, getOrders, getOrderById, updateStatusOrder, updateProductsOrder, deleteOrder  } = require('../controllers/orders.js')


router.post('/', (req, res) => { 
    createOrder(req, res)
})
router.get('/', (req, res) => {
    getOrders(req, res) 
})
router.get('/:id', (req, res) => {
    getOrderById(req, res)
})
router.put('/status/:id', (req, res) =>{
    updateStatusOrder(req, res)
})
router.put('/products/:id', (req, res) => {
    updateProductsOrder(req, res)
})
router.delete('/:id', (req, res) => {
    deleteOrder(req, res)
})



module.exports = router