import { UserModel } from "../models/User.js";
import { CustomHttpErrors } from "../errors/CustomHttpErrors.js";

async function listUser() {
  try {
    const users = await UserModel.find();
    console.log(users);

    return users;
  } catch (error) {
    throw new CustomHttpErrors({
      message: "Could not find users",
      typeError: " [GET]- users ",
    });
  }
}

export { listUser };
