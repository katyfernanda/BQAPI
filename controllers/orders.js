

const jwt = require('jsonwebtoken')
const Orders = require('../models/orders.js')

const productsOrder = (array) => {
  let arrayProducts = []
  array.forEach((element) => {
    const productOrder = {
      productOrder: {
        qty: element.productOrder.qty,
        product: element.productOrder.product,
        price: element.productOrder.price // debe ser mandado por el front el id del producto
      }
    }
    arrayProducts.push(productOrder)
  })
  return arrayProducts
}

const createOrder = (req, res) => {
  console.log("req.headers.authorization::::::::::>>>>>", req.auth)
  // const token = req.headers.authorization.replace('Bearer ', (''))

   try {
  // const decoded = jwt.verify(token, process.env.SECRET);
  if (req.auth.role.description === 'mesero') {
    if (req.body.products.length > 0) {
      const data = {
        userId: req.auth.id,
        client: req.body.client,
        products: productsOrder(req.body.products)
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
   } catch (err) {
     return res.status(401).json({ sucess: false, message: "headers authorization no encontradas" })
   }
}
// const getOrders = (req, res ) =>{
//  const token = req.headers.authorization.replace('Bearer ', (''))
//   try {
 // const decoded = jwt.verify(token, process.env.SECRET);
 //  } catch (err) {
 //   return res.status(401).json({ sucess: false, message: "headers authorization no encontradas" })
//  }
//}


module.exports = { createOrder }

