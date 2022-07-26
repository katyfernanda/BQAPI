const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  client: {
    type: String,
    required: true,
  },
  products: [
    {
      productOrder: {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "products",
        },
      },
    },
  ],
// array [pending, canceled, delivering, delivered]
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  dataEntry: {
    type: Date,
    default: Date.now,
  },
  // fecha cambia cuando status cambia a delivered?
  dataProcessed: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

orderSchema.index({ user: 1, client: 1, products: 1, status: 1});

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;
