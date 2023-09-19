const { Schema, models, model } = require("mongoose");

const cartSchema = new Schema(
  {
    qpId: {
      type: Schema.ObjectId,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const carts = models.carts || model("carts", cartSchema);
export default carts;
