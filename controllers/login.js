const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET

const login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    !email ? res.json(400)({success: false, message:'Email requerido'})
    :
    !password ? res.json(400)({success: false, message:'Password requerido'})
    :
    Users
    .findOne({ email })
    .then((response) => {
        const validatePass = bcrypt.compareSync(password, response.password)
        if(validatePass){
            const token = jwt.sign({
                email: response.email,
                role: response.role,
                commerce: response.commerce
            }, SECRET)
            res.status(200).json({success: true, token, data:{
                email: response.email,
                role: response.role,
                commerce: response.commerce
            }})
        }else{
            res.status(401).json({success: false, message:'Contraseña incorrecta'})
        }
    })
    .catch((err) => {
            res.status(400).json({succes:false, message:'Usuario no encontrado'})
    })
}

module.exports = { login }