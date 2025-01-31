import { UserModel } from "../models/User.js";
import { CustomHttpErrors } from "../errors/CustomHttpErrors.js";

async function listUser() {
  try {
    const users = await UserModel.find();

    return users;
  } catch (error) {
    throw new CustomHttpErrors({
      message: "Could not find users",
      typeError: " [GET]- users ",
    });
  }
}

async function getUserById(id) {
  try {
    const user = await UserModel.findById(id);

    return user;
  } catch (error) {
    throw new CustomHttpErrors({
      message: `Could not find user ${id} in database`,
      typeError: " [MONGO]- user by id ",
    });
  }
}

export { listUser, getUserById };
