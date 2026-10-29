import express from "express";

import cors from "cors";
import { corsOptions } from "../utils/index.js";

const router = express.Router();

/* GET home page. */
//usando Cors para dar acesso
router.get("/", cors(corsOptions), function (req, res, next) {
  res.render("index", { title: "Express" });
});

export default router;
