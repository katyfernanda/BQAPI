const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')

const SECRET = "FDXpEaMfmnr1cS1aqhWE"

app.use(express.json())
app.use(cors({
    origin:'*',
    credentials: true
}))

app.get('/', (req, res) => {
	res.json({msg: 'Hola'})
})

app.post('/auth',(req, res)=> {
	const user = req.body.user
	const pass = req.body.password

	if(!user) {
		return res.status(400).json({
			success: false,
			msg: 'Usuario requerido'
		})
	}

	if(!pass) {
		return res.status(400).json({
			success: false,
			msg: 'Contraseña requerida'
		})
	}

	
	if(user === 'admin' && pass === '123456') {
		const token = jwt.sign({ user }, SECRET )
		
		return res.status(200).json({
			success: true,
			token
		})
	} else {
		return res.status(400).json({
			success: false,
			msg: 'Usuario o contraseña incorrecto'
		})
	}
})


app.get('/orders', (req, res)=> {
	const token = req.headers.authorization

	try {
	  const decoded = jwt.verify(token, SECRET);
		return res.json({
			decoded
		})
	} catch(err) {
	  return res.json({
			err
		})
	}
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })