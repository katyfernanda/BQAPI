// const express = require('express')
// const router = express.Router()
// const jwt = require('jsonwebtoken')

// app.get('/orders', (req, res) => {
//     const token = req.headers.authorization
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET);
//         console.log(decoded)
//         return res.json({
//             decoded
//         })
//     } catch (err) {
//         return console.log(err)
//     }
// })