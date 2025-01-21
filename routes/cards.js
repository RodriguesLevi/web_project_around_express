import { Router } from "express";
import { fs } from "node:fs";
import { path } from "node:path";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const __dirname = import.meta.dirname;
let cards = [];
const file = path.join(__firname, "..", "data", "cards.json");
fs.readFile(file, (error, data) => {
  if (error) {
    console.log(error);
    cards = { error: "sistema em manutenção" };
    return;
  }
  cards = JSON.parse(data);
});
router.get("/", (request, response) => {
  if (cards.error) {
    return response.status(404).json(cards);
  }
  return response.json(cards);
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  const card = cards.find((card) => card.id === id);
  if (cards.error) {
    return response.status(404).json(cards);
  }
  if (!card) {
    return response.status(404).json({ message: `O id não foi encontrado !` });
  }
  return response.json(cards);
});

export { router };
