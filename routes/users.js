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

router.get("/", listUser);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUserById);

export { router };
