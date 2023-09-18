const { Schema, models, model } = require("mongoose");

const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const categories = models.categories || model("categories", categoriesSchema);
export default categories;
