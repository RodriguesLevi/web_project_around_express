import express from "express";
import cors from "cors";
import { router as userRouter } from "./routes/users.js";
import { router as cardsRouter } from "./routes/cards.js";

const app = express();
const port = 3000;

import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/aroundb", {});
    console.log("Database connect !");
  } catch (error) {
    console.log("error: não foi possivel conectar ao Database !!");
  }
}
connectDatabase();

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

export { connectDatabase };
