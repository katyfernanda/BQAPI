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
    if (req.auth.role.description === 'admin') {
      Users
        .find({ commerce: req.auth.commerce })
        .then((result) => {
          return res.status(200).json({ sucess: true, message: "operación exitosa", result })
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: "Hubo un error al conectarse a la base de datos, intenta nuevamente" })
        })
    } else {
      res.status(403).json({ success: false, message: 'Solo admin puede acceder a estos datos' })
    }
}

const updateUser = async (req, res) => { 
    if (req.auth.role.admin || (req.params.id === req.auth.id && !req.body.role)) { //|| req.params.id === decoded.._id) {
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
}



module.exports = { registerUser, getUsersList, updateUser }