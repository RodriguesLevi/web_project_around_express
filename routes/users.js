import { Router } from "express";
import { listUser } from "../controller/users";

const router = Router();

router.get("/", (request, response) => {
  if (!users) {
    return response.status(404).json({ message: `Usuarios não encontrados !` });
  }
  return response.json(users);
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

// export { router };
