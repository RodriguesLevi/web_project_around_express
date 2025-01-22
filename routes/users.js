import { Router } from "express";
import fs from "node:fs";
import path from "node:path";

const router = Router();
const __dirname = import.meta.dirname;
let users = [];

const file = path.join(__dirname, "..", "data", "users.json");
fs.readFile(file, (error, data) => {
  if (error) {
    console.log(error);
    users = { error: "sistema em manutenção" };
    return;
  }
  users = JSON.parse(data);
});

router.get("/", (request, response) => {
  if (!users) {
    return response.status(404).json({ message: `Usuarios não encontrados !` });
  }
  return response.json(users);
});

router.get("/:_id", (request, response) => {
  const { _id } = request.params;
  const user = users.find((user) => user._id === _id);

  if (!user) {
    return response
      .status(404)
      .json({ message: `O usuario com id ${id} não foi encontrado !` });
  }
  return response.json(user);
});

export { router };
