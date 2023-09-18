const { Schema, models, model } = require("mongoose");

const invoicesSchema = new Schema(
  {
    supplierId: {
      type: Schema.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const invoices = models.invoices || model("invoices", invoicesSchema);
export default invoices;
