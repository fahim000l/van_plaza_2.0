const { Schema, models, model } = require("mongoose");

const locationsSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    Region: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Area: {
      type: String,
      required: true,
    },
    Address: {
      type: Object,
      required: true,
    },
    LandMark: {
      type: String,
    },
    def: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const locations = models.locations || model("locations", locationsSchema);
export default locations;
