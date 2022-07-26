const express = require('express')
const router = express.Router()
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products')

router.get("/", (req, res) => {
  getAllProducts(req, res)
})
router.get("/:id", (req, res) => {
  getProductById(req, res)
})
router.post("/", (req, res) => {
  createProduct(req, res)
})
router.put("/:id", (req, res) => {
  updateProduct(req, res)
})
router.delete("/:id", (req, res) => {
  deleteProduct(req, res)
})

module.exports = router