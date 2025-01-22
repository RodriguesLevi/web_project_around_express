import { Router } from "express";
import fs from "node:fs";
import path from "node:path";

const router = Router();
const __dirname = import.meta.dirname;
let cards = [];
const file = path.join(__dirname, "..", "data", "cards.json");

fs.readFile(file, (error, data) => {
  if (error) {
    console.log(error);
    cards = { error: "sistema em manutenção" };
    return;
  }
  cards = JSON.parse(data);
});

router.get("/", (request, response) => {
  if (!cards) {
    return response.status(404).json({ message: `Cartões não encontrados !` });
  }
  return response.json(cards);
});

export { router };
