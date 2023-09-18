const { Schema, models, model } = require("mongoose");

const productsSchema = new Schema(
  {
    productName: {
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
    categoryId: {
      type: Schema.ObjectId,
      required: true,
    },
    detailedImage: {
      type: String,
    },
    standardImage: {
      type: String,
      required: true,
    },
    regularImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const products = models.products || model("products", productsSchema);
export default products;
