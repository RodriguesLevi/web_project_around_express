import mongoose, { version } from "mongoose";
const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlenght: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlenght: 30,
    },
    avatar: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userScheme);
export { UserModel };
