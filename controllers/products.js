const Products = require("../models/products");

//Parameters:
//_page/int/default 1 = página del listado
//_limit/int/default 10 = cantidad de productos por página
const getAllProducts = (req, res) => {
  Products
    .find()
    .then((result) => {
      res.status(200).json({ success: true, message: 'Operación exitosa', result });
    })
    .catch((error) => {
      res.json({ success: false, error })
    });
};

const getProductById = (req, res) => {
  Products
    .findOne({ id: req.params.id})
    .then((result) => {
      res.status(200).json({ success: true, message: 'Operación exitosa', result })
    })
    .catch((error) => {
      res.status(404).json({ success: false, message: 'Producto no existe', error })
    });
};

const createProduct = (req, res)=> {
  const data = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      type: req.body.type,
      //commerce: nombre del app que esta consumiendo la api
  }
  const product = new Products(data)
  if(!req.body.name || !req.body.price){
    res.status(400).json({ success: true, message: 'Producto debe tener nombre y precio'})
  }
  product
      .save()
      .then((result)=> {
          res.status(200).json({ success: true, message: 'Producto creado', result })
      })
      .catch((error)=> {
          res.json({ success: false, message: 'Error al crear producto', error })
      })
}

const updateProduct = (req, res)=> {
  Products
      .findByIdAndUpdate(
          { id: req.params.id },
          { $set: req.body }
      )
      .then((result)=> {
          res.status(200).json({ success: true, result })
      })
      .catch((error)=> {
          res.json({ success: false, error })
      })
}
const deleteProduct = (req, res)=> {
  Products
      .findByIdAndRemove({ id: req.params.id})
      .then((result)=> {
          res.json({ success: true, result })
      })
      .catch((error)=> {
          res.json({ success: false, error })
      })
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };