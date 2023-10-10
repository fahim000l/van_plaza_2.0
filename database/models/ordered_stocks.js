const { Schema, models, model } = require("mongoose");

const orderedStocksSchema = new Schema(
  {
    qpId: {
      type: Schema.ObjectId,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.ObjectId,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
    orderId: {
      type: Schema.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ordered_stocks =
  models?.ordered_stocks || model("ordered_stocks", orderedStocksSchema);

export default ordered_stocks;
