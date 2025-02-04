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

async function createUser(body) {
  try {
    const { name, about, avatar } = body;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    const aboutRegex = /^[\w\W\s]+$/;
    const avatarRegex = /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg)$/;
    const isValid =
      name.match(nameRegex) &&
      about.match(aboutRegex) &&
      avatar.match(avatarRegex);
    if (!isValid) {
      throw new CustomHttpErrors({
        message: `Avatar link is invalid, should be a url`,
        typeError: " [LINK]-  ERRO ",
        statusCode: 422,
      });
    }

    const newUser = await UserModel({ name, about, avatar });
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    console.log(error);
    if (error.statusCode == 422) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: `Could create new user`,
      typeError: " [POST]- Invalid user ",
    });
  }
}

async function updateUser(id, body) {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomHttpErrors({
        message: `Could not find user ${id}`,
        typeError: "[GET] - User by id",
      });
    }

    const { name, about, avatar } = body;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    const aboutRegex = /^[\w\W\s]+$/;
    const avatarRegex = /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg)$/;
    const isValid =
      name.match(nameRegex) &&
      about.match(aboutRegex) &&
      avatar.match(avatarRegex);
    if (!isValid) {
      throw new CustomHttpErrors({
        message: `Avatar link is invalid, should be a url`,
        typeError: " [LINK]-  ERRO ",
        statusCode: 422,
      });
    }

    const updatedUser = Object.assign(user, { name, about, avatar });
    await UserModel.findOneAndUpdate({ _id: id }, updatedUser);

    return updatedUser;
  } catch (error) {
    if (error.statusCode == 422) {
      throw error;
    }
    if (error.statusCode == 404) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: `Could update user`,
      typeError: " [PUT]- Invalid user ",
    });
  }
}

async function deleteUserById(id) {
  try {
    await UserModel.deleteOne({ _id: id });

    return;
  } catch (error) {
    throw new CustomHttpErrors({
      message: `Could delete user ${id} in database`,
      typeError: " [DELETE]- user by id ",
    });
  }
}

export { listUser, getUserById, createUser, updateUser, deleteUserById };
