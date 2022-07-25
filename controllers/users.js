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
        res.status(200).json({success: true, message:'Usuario registrado con éxito'})

    })
    .catch((error) =>{
        res.status(400).json({success: false, message:'El usuario no se ha podido registrar'})
    })
}
const allUsers = async (req, res) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded.commerce)
        if(decoded.role.description === 'admin'){
        Users
        .find({commerce: decoded.commerce})
        .then((result)=> {
            return res.json({ sucess: true, result })
        })
        .catch((error)=> {
            res.json({ success: false, error })
        })
    }else{
        res.json({success: false, message:'tecrei jefe y no te pelay ni una papa'})
    }
   
    } catch (err) {
        return console.log(err)
    }
    
    // const users = await Users.find() 
    // .then((response) => {
    //     console.log(users)
    //     res.status(200).json({succes: true, message: 'operación exitosa'})
    // }).catch((error) => {
    //     console.log(error.message)
    //     // si no hay cabecera de autenticación {"error": "string"} status 401
    //     // sii el token no es de una usuaria admin {"error": "string"} status 403
    // })
    
    
    
}



module.exports= { registerUser, allUsers}