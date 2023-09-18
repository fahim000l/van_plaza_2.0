const { Schema, models, model } = require("mongoose");

const sizesSchema = new Schema(
  {
    sizeName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.ObjectId,
      required: true,
    },
    sizeAttributes: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const sizes = models.sizes || model("sizes", sizesSchema);
export default sizes;
