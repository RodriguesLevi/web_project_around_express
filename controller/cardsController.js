import { CardModel } from "../models/Card.js";
import { CustomHttpErrors } from "../errors/CustomHttpErrors.js";

// Listar todos os cards
async function listCards() {
  try {
    const cards = await CardModel.find();
    return cards;
  } catch (error) {
    throw new CustomHttpErrors({
      message: "Could not fetch cards",
      typeError: "[GET] - Cards",
    });
  }
}

// Criar um novo card
async function createCard(body, userId) {
  try {
    const { name, link } = body;

    // Validação do link (deve ser uma URL válida)
    const linkRegex = /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg)$/;
    if (!link.match(linkRegex)) {
      throw new CustomHttpErrors({
        message: "Invalid link format",
        typeError: "[POST] - Invalid card link",
        statusCode: 422,
      });
    }

    // Cria o card com o ID do usuário como proprietário
    const newCard = await CardModel.create({
      name,
      link,
      owner: userId,
    });

    return newCard;
  } catch (error) {
    if (error.statusCode === 422) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: "Could not create card",
      typeError: "[POST] - Card creation failed",
    });
  }
}

// Deletar um card por ID
async function deleteCardById(cardId, userId) {
  try {
    const card = await CardModel.findById(cardId);

    // Verifica se o card existe
    if (!card) {
      throw new CustomHttpErrors({
        message: "Card not found",
        typeError: "[DELETE] - Card not found",
        statusCode: 404,
      });
    }

    // Verifica se o usuário é o proprietário do card
    if (card.owner.toString() !== userId) {
      throw new CustomHttpErrors({
        message: "You are not the owner of this card",
        typeError: "[DELETE] - Unauthorized",
        statusCode: 403,
      });
    }

    await CardModel.deleteOne({ _id: cardId });
    return;
  } catch (error) {
    if (error.statusCode === 404 || error.statusCode === 403) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: "Could not delete card",
      typeError: "[DELETE] - Card deletion failed",
    });
  }
}

// Curtir um card
async function likeCard(cardId, userId) {
  try {
    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } }, // Adiciona o ID do usuário ao array de likes
      { new: true }
    );

    if (!card) {
      throw new CustomHttpErrors({
        message: "Card not found",
        typeError: "[PUT] - Card not found",
        statusCode: 404,
      });
    }

    return card;
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: "Could not like card",
      typeError: "[PUT] - Like card failed",
    });
  }
}

// Remover curtida de um card
async function unlikeCard(cardId, userId) {
  try {
    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // Remove o ID do usuário do array de likes
      { new: true }
    );

    if (!card) {
      throw new CustomHttpErrors({
        message: "Card not found",
        typeError: "[DELETE] - Card not found",
        statusCode: 404,
      });
    }

    return card;
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: "Could not unlike card",
      typeError: "[DELETE] - Unlike card failed",
    });
  }
}

export { listCards, createCard, deleteCardById, likeCard, unlikeCard };
