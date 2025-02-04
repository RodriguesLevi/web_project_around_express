import { request, response, Router } from "express";
import {
  listUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from "../controller/usersController.js";
import { CustomHttpErrors } from "../errors/CustomHttpErrors.js";

const router = Router();

router.get("/", async (request, response) => {
  try {
    const users = await listUser();
    return response.json(users);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return response.status(statusCode).json({
      typeError,
      message,
    });
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new CustomHttpErrors({
        message: `Could not find user ${id} in database`,
        typeError: "[GET] - User by id ",
      });
    }
    return response.json(user);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return response.status(statusCode).json({
      typeError,
      message,
    });
  }
});

router.post("/", async (request, response) => {
  const body = request.body;
  try {
    const newUser = await createUser(body);
    return response.status(201).json(newUser);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return response.status(statusCode).json({
      typeError,
      message,
    });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const updatedUser = await updateUser(id, body);
    return response.status(201).json(updatedUser);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return response.status(statusCode).json({
      typeError,
      message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await deleteUserById(id);
    return response.status(204).json();
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return response.status(statusCode).json({
      typeError,
      message,
    });
  }
});

export { router };
