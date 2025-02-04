// import { Router } from "express";
// import fs from "node:fs";
// import path from "node:path";

// const router = Router();
// const __dirname = import.meta.dirname;
// let cards = [];
// const file = path.join(__dirname, "..", "data", "cards.json");

// fs.readFile(file, (error, data) => {
//   if (error) {
//     console.log(error);
//     cards = { error: "sistema em manutenção" };
//     return;
//   }
//   cards = JSON.parse(data);
// });

// router.get("/", (request, response) => {
//   if (!cards) {
//     return response.status(404).json({ message: `Cartões não encontrados !` });
//   }
//   return response.json(cards);
// });

// export { router };
import { Router } from "express";
import {
  listCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
} from "../controller/cardsController.js";
import { CustomHttpErrors } from "../errors/CustomHttpErrors.js";

const router = Router();

// GET /cards — Retorna todos os cards
router.get("/", async (req, res) => {
  try {
    const cards = await listCards();
    return res.json(cards);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return res.status(statusCode).json({
      typeError,
      message,
    });
  }
});

// POST /cards — Cria um novo card
router.post("/", async (req, res) => {
  try {
    const { body, user } = req; // Assume que o ID do usuário está disponível em req.user
    const newCard = await createCard(body, user._id);
    return res.status(201).json(newCard);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return res.status(statusCode).json({
      typeError,
      message,
    });
  }
});

// DELETE /cards/:cardId — Deleta um card por ID
router.delete("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { user } = req; // Assume que o ID do usuário está disponível em req.user
    await deleteCardById(cardId, user._id);
    return res.status(204).json();
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return res.status(statusCode).json({
      typeError,
      message,
    });
  }
});

// PUT /cards/:cardId/likes — Curtir um card
router.put("/:cardId/likes", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { user } = req; // Assume que o ID do usuário está disponível em req.user
    const updatedCard = await likeCard(cardId, user._id);
    return res.json(updatedCard);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return res.status(statusCode).json({
      typeError,
      message,
    });
  }
});

// DELETE /cards/:cardId/likes — Remover curtida de um card
router.delete("/:cardId/likes", async (req, res) => {
  try {
    const { cardId } = req.params;
    const { user } = req; // Assume que o ID do usuário está disponível em req.user
    const updatedCard = await unlikeCard(cardId, user._id);
    return res.json(updatedCard);
  } catch (error) {
    const { message, statusCode, typeError } = error;
    return res.status(statusCode).json({
      typeError,
      message,
    });
  }
});

export { router };
