import { UserModel } from "../models/User.js";
import { CustomHttpErrors } from "../errors/CustomHttpErrors.js";

async function listUser() {
  try {
    const users = await UserModel.find();

    return users;
  } catch (error) {
    throw new CustomHttpErrors({
      message: "Could not find users",
      typeError: " [GET]- users ",
    });
  }
}

async function getUserById(id) {
  try {
    const user = await UserModel.findById(id);

    return user;
  } catch (error) {
    throw new CustomHttpErrors({
      message: `Could not find user ${id} in database`,
      typeError: " [MONGO]- user by id ",
    });
  }
}

async function createUser(body) {
  try {
    const { name, about, avatar } = body;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    const aboutRegex = /^[\w\W\s]+$/;
    const avatarRegex = /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg)$/;
    const isValid =
      name.match(nameRegex) &&
      about.match(aboutRegex) &&
      avatar.match(avatarRegex);
    if (!isValid) {
      throw new CustomHttpErrors({
        message: `Avatar link is invalid, should be a url`,
        typeError: " [LINK]-  ERRO ",
        statusCode: 422,
      });
    }

    const newUser = await UserModel({ name, about, avatar });
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    console.log(error);
    if (error.statusCode == 422) {
      throw error;
    }
    throw new CustomHttpErrors({
      message: `Could create new user`,
      typeError: " [POST]- Invalid user ",
    });
  }
}

// async function createUser(body) {
//   try {
//     const { name, about, avatar } = body;

//     // Verifica se os campos existem e não estão vazios
//     if (!name || !about || !avatar) {
//       throw new CustomHttpErrors({
//         message: "Todos os campos (name, about, avatar) são obrigatórios.",
//         typeError: "[VALIDATION]-ERRO",
//         statusCode: 422,
//       });
//     }

//     // Expressões regulares para validação
//     const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
//     const aboutRegex = /^[\w\W\s]+$/;
//     const avatarRegex = /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg)$/;

//     // Valida os campos usando as regex
//     const isNameValid = name.match(nameRegex);
//     const isAboutValid = about.match(aboutRegex);
//     const isAvatarValid = avatar.match(avatarRegex);

//     // Verifica se todos os campos são válidos
//     if (!isNameValid || !isAboutValid || !isAvatarValid) {
//       throw new CustomHttpErrors({
//         message:
//           "Dados inválidos. Verifique o nome, a descrição e o link do avatar.",
//         typeError: "[VALIDATION]-ERRO",
//         statusCode: 422,
//       });
//     }

//     // Se tudo estiver válido, continue com a lógica de criação do usuário
//     console.log("Usuário válido. Criando usuário...");
//     // ... (sua lógica para criar o usuário)
//   } catch (error) {
//     console.error("Erro ao criar usuário:", error);
//     throw error; // Rejeita a promise para que o chamador possa lidar com o erro
//   }
// }

// async function getUserById(id) {
//   try {
//     try {
//       const { name, about, avatar } = body;
//       const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
//       const aboutRegex = /^[\w\W\s]+$/;
//       const avatarRegex = /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg)$/;
//       const isValid =
//         name.match(nameRegex) &&
//         about.match(aboutRegex) &&
//         avatar.match(avatarRegex);
//       if (!isValid) {
//         throw new CustomHttpErrors({
//           message: `Avatar link is invalid, should be a url`,
//           typeError: " [LINK]-  ERRO ",
//           statusCode: 422,
//         });
//       }
//       const user = await UserModel.findById(id);
//       return user

//       }

//     }
//   catch (error) {
//     throw new CustomHttpErrors({
//       message: `Could not find user ${id} in database`,
//       typeError: " [MONGO]- user by id ",
//     });
//   }
// }

export { listUser, getUserById, createUser };
