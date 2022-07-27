const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: String, //Number o String?
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