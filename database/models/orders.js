const { Schema, models, model } = require("mongoose");

const ordersShema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    deleveryFee: {
      type: String,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const orders = models.orders || model("orders", ordersShema);

export default orders;
