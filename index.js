const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const { registerUser } = require('./controllers/users.js')
const { login } = require('./controllers/login.js')

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

app.get('/', (req, res) => {
    res.json({ msg: 'Hola' })
})
app.post('/register', (req, res) => {
    registerUser(req, res)
})

app.post('/auth',(req, res) => {
    login(req, res)
})


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


const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })