import { Router } from "express";
import { listUser } from "../controller/usersController.js";

const router = Router();

router.get("/", async (request, response) => {
  try {
    const users = await listUser();
    console.log(users);
    return response.json(users);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return response.status(statusCode).json({
      typeError,
      message,
    });
  }
});

// router.get("/:_id", (request, response) => {
//   const { _id } = request.params;
//   const user = users.find((user) => user._id === _id);

//   if (!user) {
//     return response
//       .status(404)
//       .json({ message: `O usuario com id ${id} não foi encontrado !` });
//   }
//   return response.json(user);
// });

export { router };
