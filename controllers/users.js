const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SALT = bcrypt.genSaltSync(10);

const registerUser = (req, res) => {
  const data = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, SALT),
    role: req.body.role,
    commerce: req.body.commerce
  }
  const user = new Users(data)
  user
    .save()
    .then((response) => {
      res.status(200).json({ success: true, message: 'Usuario registrado con éxito' })
    })
    .catch((error) => {
      res.status(400).json({ success: false, message: 'El usuario no se ha podido registrar' })
    })
}

const getUsersList = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', (''))
  console.log("token:",token)
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded:",decoded)
    if (decoded.role.description === 'admin') {
      Users
        .find({ commerce: decoded.commerce })
        .then((result) => {
          return res.status(200).json({ sucess: true, message: "operación exitosa", result })
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
        })
    } else {
      res.status(403).json({ success: false, message: 'Solo admin puede acceder a estos datos' })
    }
  } catch (err) {
    console.log("catch:", err)
    return res.status(401).json({ sucess: false, message: "headers authorization no encontradas" })
  }
}

const updateUser = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', (''))
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.role.description === 'admin' || (req.params.id === decoded.id && !req.body.role)) { //|| req.params.id === decoded.._id) {
      Users
        .findByIdAndUpdate(
          { _id: req.params.id },
          { $set: req.body }
        )
        .then((result) => {
          Users
            .findOne({ _id: req.params.id })
            .then((result) => {
              return res.status(200).json({ sucess: true, message: 'operación exitosa has editado', result })
            })
        })
        .catch((error) => {
          res.json({ success: false, message: 'Hubo un error al conectarse a la base de datos, intenta nuevamente' })
        })
    } else {
      res.status(403).json({ success: false, message: 'Acceso solo para admin o los datos del mismo usuario acreditado' })
    }
  } catch (err) {
    return res.status(401).json({ sucess: false, message: 'headers authorization no encontradas' })
  }
}



module.exports = { registerUser, getUsersList, updateUser }