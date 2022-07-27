const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  
  userId: 
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },

  client: {
    type: String,
    required: true,
  },
  products: [
    {
      productOrder: {
        qty: {
          type: Number,
          required: true
        },
        product: {
          type: mongoose.Types.ObjectId,
          ref: "products",
        },
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
});

orderSchema.index({ user: 1, client: 1, products: 1, status: 1 });

  const Orders = mongoose.model("orders", orderSchema);

  module.exports = Orders;
