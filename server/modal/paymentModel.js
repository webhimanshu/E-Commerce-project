const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentID: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
{timestamps:true} 
);

 const Payments= mongoose.model("Payment", paymentSchema);
 module.exports =Payments;