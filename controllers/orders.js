

const jwt = require('jsonwebtoken')
const Orders = require('../models/orders.js')
const status = ['pending', 'canceled', 'delivering', 'delivered']

// const productsOrder = (array) => {
//   let arrayProducts = []
//   console.log("array __________________>>",array)
//   array.forEach((element) => {
//     const productOrder = {
//       productOrder: {
//         qty: element.qty,
//         product: element.product,
//         price: element.price // debe ser mandado por el front el id del producto
//       }
//     }
//     arrayProducts.push(productOrder)
//   })
//   return arrayProducts
// }

const createOrder = (req, res) => {
  console.log("req.headers.authorization::::::::::>>>>>", req.auth)
  if (req.auth.role.description === 'mesero') {
    if (req.body.products.length > 0) {
      const data = {
        userId: req.auth.id,
        client: req.body.client,
        products: req.body.products
      }
      const orders = new Orders(data)
      orders
        .save()
        .then((response) => {
          return res.status(200).json({ success: true, message: 'Orden registrada con éxito' })
        })
        .catch((error) => {
          return res.status(400).json({ success: false, message: 'Orden no registrada' })
        })
    } else {
      return res.status(401).json({ sucess: false, message: "Para crear una orden debes agregar productos" })
    }
  } else {
    return res.status(401).json({ sucess: false, message: "No tienes permiso para crear ordenes, acercate a un mesero" })
  }
}
const getOrders = (req, res) => {
  console.log(req.auth)
  Orders
    .find({ commerce: req.auth.commerce })
    .then((result) => {
      return res.status(200).json({ sucess: true, message: "operación exitosa", result })
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
    })
}

const getOrderById = (req, res) => {
  Orders
    .findById({ _id: req.params.id })
    .then((result) => {
      return res.status(200).json({ sucess: true, message: "operación exitosa", result })
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
    })
}

const updateOrder = (req, res) => {
  console.log(req.body.status)
  if (status.includes(req.body.status)) {
    Orders
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      )
      .then((response) => {
        return res.status(200).json({ sucess: true, message: "Estado cambiado", response })
      })
      .catch((err) => {
        return res.status(404).json({ sucess: true, message: "La orden no existe" })
      })
  } else {
    return res.status(400).json({ sucess: true, message: "Estado no válido" })
  }
  if(req.body.products){
    
  }
  // Orders
  //   .findOne(
  //     { _id: req.params.id },
  //     // { $set: req.body }
  //   )






}
//
// const products = [
//    {
//   "qty": "1",
//   "product":"pure",
//   "price": "2.000"
//   },
//    {
//   "qty": "1",
//   "product":"papas fritas gourmet",
//   "price": "2.000"
//   }
//   }
// ]
//   if (req.auth.role.admin || (req.params.id === req.auth.id && !req.body.role)) { //|| req.params.id === decoded.._id) {
//     Users
//       .findByIdAndUpdate(
//         { _id: req.params.id },
//         { $set: req.body }
//       )
//       .then((result) => {
//         Users
//           .findOne({ _id: req.params.id })
//           .then((result) => {
//             return res.status(200).json({ sucess: true, message: 'operación exitosa has editado', result })
//           })
//       })
//       .catch((error) => {
//         res.json({ success: false, message: 'Hubo un error al conectarse a la base de datos, intenta nuevamente' })
//       })
//  
// }

module.exports = { createOrder, getOrders, getOrderById, updateOrder }

