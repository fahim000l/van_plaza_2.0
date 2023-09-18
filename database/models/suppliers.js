const { Schema, models, model } = require("mongoose");

const suppliersSchema = new Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const suppliers = models.suppliers || model("suppliers", suppliersSchema);

export default suppliers;
