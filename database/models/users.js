const { Schema, models, model } = require("mongoose");

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
    },
    isVarified: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
    },
    emailToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const users = models.users || model("users", usersSchema);
export default users;
