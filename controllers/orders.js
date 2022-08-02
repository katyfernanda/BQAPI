

const jwt = require('jsonwebtoken')
const Order = require('../models/orders.js')
const status = ['pending', 'canceled', 'delivering', 'delivered']


const createOrder = (req, res) => {
  if (req.auth.role.description === 'mesero') {
    if (req.body.products.length > 0) {
      const data = {
        userId: req.auth.id,
        client: req.body.client,
        products: req.body.products
      }
      const orders = new Order(data)
      orders
        .save()
        .then((response) => {
          return res.status(200).json({ success: true, message: 'Orden registrada con éxito', response })
        })
        .catch((error) => {
          return res.status(400).json({ success: false, message: 'Orden no registrada' })
        })
    } else {
      return res.status(401).json({ success: false, message: "Para crear una orden debes agregar productos" })
    }
  } else {
    return res.status(401).json({ success: false, message: "No tienes permiso para crear ordenes, acercate a un mesero" })
  }
}
const getOrders = (req, res) => {
  Order
    .find({ commerce: req.auth.commerce })
    .then((result) => {
      return res.status(200).json({ success: true, message: "operación exitosa", result })
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
    })
}

const getOrderById = (req, res) => {
  Order
    .findById({ _id: req.params.id })

    .then((result) => {
      return res.status(200).json({ success: true, message: "operación exitosa", result })
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
    })
}

const updateStatusOrder = (req, res) => {
  if (status.includes(req.body.status)) {
    Order
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: req.body.status
          }
        }
      )
      .then((response) => {
        res.status(200).json({ success: true, message: "Estado cambiado", response })
      })
      .catch((err) => {
        res.status(404).json({ success: false, message: "La orden no existe" })
      })
  } else {
    return res.status(400).json({ success: false, message: "Estado no válido" })
  }
}

const updateProductsOrder = async (req, res) => {
  const productsArray = req.body.products //[{product},{}]
  let order
  try {
    order = await Order.findById({ _id: req.params.id })
  } catch {
    (error)
    res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
  }
  productsArray.forEach((element) => { //[{ product: 'papas duquesas gourmet', qty: '90' },{ product: 'smoothie de papas', qty: '5' }]
    const index = order.products.findIndex((el) => {
      return el.product === element.product
    })
    if (index != -1) {
      order.products[index].qty = element.qty
    } else {
      order.products.push(element)
    }
  });
  console.log(order)
  Order
    .findByIdAndUpdate(
      { _id: req.params.id },
      { $set: order },
      { new: true }
    )
    .then((result) => {
      return res.status(200).json({ success: true, message: "Operación exitosa", result })
    })
    .catch((err) => {
      return res.status(418).json({ success: false, message: "No existe la orden", err })
    })
}
const deleteOrder = (req, res) => {
  console.log(req.auth.role)
  if (req.auth.role === 'admin') {
    Order
      .findOneAndDelete(
        { _id: req.params.id }
      )
      .then((result) => {
        return res.status(200).json({ success: true, message: "Borraste el documento"})
      })
      .catch((err) => {
        return res.status(404).json({ success: false, message: "Documento no encontrado"})
      })
  } else {
    return res.status(403).json({ success: false, message: "Acceso denegado" })
  }
}







module.exports = { createOrder, getOrders, getOrderById, updateStatusOrder, updateProductsOrder, deleteOrder }

