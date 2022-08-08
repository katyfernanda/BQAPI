const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: { 
		description : {
		type: String, // admin , admin = true
		required: true,
		},
		admin:  {    
		type: Boolean,
		default: false
		}
	},
	commerce: {
		type: String,
		required: true
    },
	active: {
		type: Boolean,
		default: true
	}
})

// userSchema.index({ email: 1, commerce: 1, role: 1  })

const Users = mongoose.model('users', userSchema)

module.exports = Users