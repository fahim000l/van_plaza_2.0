const { Schema, models, model } = require("mongoose");

const products_stocksSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
    buyPrice: {
      type: String,
      required: true,
    },
    sellPrice: {
      type: String,
      required: true,
    },
    flaw1: {
      type: String,
    },
    flaw1_delete_url: {
      type: String,
    },
    flaw2: {
      type: String,
    },
    flaw2_delete_url: {
      type: String,
    },
    flaw3: {
      type: String,
    },
    flaw3_delete_url: {
      type: String,
    },
    invoiceId: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const products_stocks =
  models.products_stocks || model("products_stocks", products_stocksSchema);

export default products_stocks;
