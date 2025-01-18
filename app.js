import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

function logger(req, res, next) {
  console.log(`${new Intl.DateTimeFormat("pt-BR").format(Date.now())}-`);
  next();
}

app.use(cors(""));
app.use(logger);

app.get("/", (request, response) => {
  return response.json({ funcionando: "ok" });
});

app.listen(port, () => {
  console.log(`Sever running on http://localhost:${port}`);
});
