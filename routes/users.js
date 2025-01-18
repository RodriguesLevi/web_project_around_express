import { Router } from "express";
// import { fs } from "node:fs";
// import { path } from "node:path";
// import { v4 as uuidv4 } from "uuid";

const router = Router();
router.get("/", (request, response) => {
  return response.json({ funcionando: "ok" });
});

export { router };
