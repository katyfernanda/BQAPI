const Products = require("../models/products");

const getAllProducts = (req, res) => {
  Products
    .find()
    .then((result) => {
      res.status(200).json({ success: true, message: 'Listado de productos encontrados', result });
    })
    .catch((error) => {
      res.json({ success: false, error })
    });
};

const getProductById = (req, res) => {
  Products
    .findOne({ id: req.params.id})
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
      type: req.body.type
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