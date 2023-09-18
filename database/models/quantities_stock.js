const { Schema, models, model } = require("mongoose");

const quantities_stockSchema = new Schema(
  {
    size: {
      type: Schema.ObjectId,
      required: true,
    },
    quantity: {
      type: String,
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
