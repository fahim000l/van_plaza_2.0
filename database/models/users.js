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
    role: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const users = models.users || model("users", usersSchema);
export default users;
