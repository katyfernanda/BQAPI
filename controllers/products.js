const jwt = require('jsonwebtoken')
const Products = require("../models/products");

const getAllProducts = (req, res) => {
  const token = req.headers.authorization.replace('Bearer ',(''))
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if(decoded.role.description === 'admin'){
      Products
      .find()
      .then((result) => {
        res.status(200).json({ success: true, message: 'Operación exitosa', result });
      })
      .catch((error) => {
        res.json({ success: false, error })
      });
    }else{
      res.status(403).json({ success: false, message: 'Solicitud no procesada' })
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Sin autorización" })
  }
};

const getProductById = (req, res) => {
  Products
    .findOne({ _id: req.params.id})
    .then((result) => {
      res.status(200).json({ success: true, message: 'Se encontró el producto solicitado', result })
    })
    .catch((error) => {
      res.json({ success: false, error })
    });
};

const createProduct = (req, res)=> {
  const data = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category
  }

  const product = new Products(data)
  product
      .save()
      .then((result)=> {
          res.json({ success: true, msg: 'Producto creado', result })
      })
      .catch((error)=> {
          res.json({ success: false, msg: 'Error al crear producto', error })
      })
}

const updateProduct = (req, res)=> {
  Products
      .findOneAndUpdate(
          { id: req.params.id },
          { $set: req.body }
      )
      .then((result)=> {
          res.json({ success: true, result })
      })
      .catch((error)=> {
          res.json({ success: false, error })
      })
}
const deleteProduct = (req, res)=> {
  Products
      .deleteOne({ id: req.params.id})
      .then((result)=> {
          res.json({ success: true, result })
      })
      .catch((error)=> {
          res.json({ success: false, error })
      })
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };