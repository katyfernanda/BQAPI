const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose')
const { expressjwt } = require("express-jwt");
const routes = require('./routes/index')


require('dotenv').config()


const URL = process.env.NODE_ENV === 'development' ? process.env.DB_DEV : process.env.DB_PROD
mongoose
    .connect(URL)
    .then(() => {
        const message = process.env.NODE_ENV === 'development' ? 'Conectado a DB_DEV' : 'Conectado a DB_PROD'
        console.log(message)
    })
    .catch((err) => {
        console.log(err)
    })


app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(
    expressjwt({
        secret: process.env.SECRET, algorithms: ["HS256"],
    }).unless({ path: ["/auth", "/users", "/orders"]  })
)



app.get('/', (req, res) => {
    res.json({ msg: 'API conectada ;)' })
})

app.use('/', routes)


app.get('/orders', (req, res) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded)
        return res.json({
            decoded
        })
    } catch (err) {
        return console.log(err)
    }
})

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("Token inválido");
    } else {
      next(err);
    }
  });


const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })