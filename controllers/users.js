const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')

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
        res.status(200).json({success: true, message:'Usuario registrado con éxito'})

    })
    .catch((error) =>{
        res.status(400).json({success: false, message:'El usuario no se ha podido registrar'})
    })
}

module.exports= { registerUser }