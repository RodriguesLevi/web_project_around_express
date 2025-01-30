import express from "express";
import cors from "cors";
import { connectDatabase } from "./data/database.js";
import { router as userRouter } from "./routes/users.js";
import { router as cardsRouter } from "./routes/cards.js";
const app = express();
const port = 3000;

try {
  connectDatabase();
} catch (error) {
  console.log("Não foi possivel conectar ao database");
}

function logger(req, res, next) {
  console.log(
    `${new Intl.DateTimeFormat("pt-BR").format(Date.now())}- ${req.method} - ${
      req.url
    }`
  );
  next();
}

app.use(cors(""));
app.use(express.json());
app.use(logger);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.listen(port, () => {
  console.log(`Sever running on http://localhost:${port}`);
});
