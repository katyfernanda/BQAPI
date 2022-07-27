const mongoose = require('mongoose')
const { Schema } = mongoose

//qué hacer con el id de product, se puede autoincrementable? 
const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: {
    // documentación dice string
    // pero debería ser un number?
		type: String,
		required: true
	},
	image: {
		type: String,
    required: false
	},
	type: {
		type: String,
		required: false
    },
	dataEntry: {
		type: Date,
		default: Date.now
	}
})

productSchema.index({ name: 1, price: 1, category: 1  })

const Products = mongoose.model('products', productSchema)

module.exports = Products