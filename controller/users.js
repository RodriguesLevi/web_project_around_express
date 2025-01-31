import { UserModel } from "../models/User";
import { CustomHttpErrors } from "../errors/CustomHttpErrors";

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

export { listUser };
