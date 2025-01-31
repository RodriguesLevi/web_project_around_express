import { Router } from "express";
import { listUser, getUserById } from "../controller/usersController.js";
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

export { router };
