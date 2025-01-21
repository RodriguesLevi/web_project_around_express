import { Router } from "express";
import { fs } from "node:fs";
import { path } from "node:path";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const __dirname = import.meta.dirname;
let users = [];
const file = path.join(__firname, "..", "data", "users.json");
fs.readFile(file, (error, data) => {
  if (error) {
    console.log(error);
    users = { error: "sistema em manutenção" };
    return;
  }
  users = JSON.parse(data);
});
router.get("/", (request, response) => {
  if (users.error) {
    return response.status(404).json(users);
  }
  return response.json(users);
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === id);
  if (users.error) {
    return response.status(404).json(users);
  }
  if (!user) {
    return response.status(404).json({ message: `O id não foi encontrado !` });
  }
  return response.json(users);
});

export { router };
