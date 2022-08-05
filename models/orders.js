const mongoose = require("mongoose");
const { Schema } = mongoose;

//diferencia entre mongoose.Types.ObjectId y Schema.Types.ObjectId?
const orderSchema = new Schema({
  
  userId: 
    {
      type: Schema.Types.ObjectId, // id: 'oiasiuss88999']
      required: true,
    },
  client: {
    type: String,
    required: true,
  },
  table:{
    type: String,
    required: false
    
  },
  products: [ {
        qty: {
          type: Number,
          required: true,
        },
        product: {
          type: String,
          required: true,
          unique: true
        },
        price: {
          type: String,
          required: false
        },
    },
  ],
// array [pending, canceled, delivering, delivered]
  status: {
    required: true,
    type: String,
    default: 'pending',
    enum: ['pending', 'canceled', 'delivering', 'delivered']
  },
  dataEntry: {
    type: Date,
    default: Date.now,
  },
  // fecha cambia cuando status cambia a delivered?
  dataProcessed: {
    type: Date,
  },
  commerce: {
    type: String,
    required: true
  }
});

orderSchema.index({ userId: 1, client: 1, products: 1, status: 1 });
  const Orders = mongoose.model("orders", orderSchema);
  module.exports = Orders;
