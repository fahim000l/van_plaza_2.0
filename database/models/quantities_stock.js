const { Schema, models, model } = require("mongoose");

const quantities_stockSchema = new Schema(
  {
    size: {
      type: Schema.ObjectId,
      required: true,
    },
    psId: {
      type: Schema.ObjectId,
      required: true,
    },
    categoryId: {
      type: Schema.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    invoiceId: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const quantities_stock =
  models.quantities_stock || model("quantities_stock", quantities_stockSchema);

export default quantities_stock;
