import express from "express";
import cors from "cors";
import {
  corsOptions,
  testApiKey,
  createToken,
  validadeToken,
  APIKeyMiddleware,
  TokenMiddleware,
} from "../utils/index.js";

var router = express.Router();

router.post("/", cors(corsOptions), function (req, res, next) {
  res.set("Content-Type", "application/json");
  funcaoDeLogin(req.body.user, req.body.password)
    .then((jwt) => {
      res.set("JWT_Token", jwt);
      res
        .cookie("BackendToken", jwt, {
          httpOnly: true,
          secure: false,
          partitioned: true,
          sameSite: false,
          maxAge: validadeToken * 1000,
        })
        .send(jwt);
    })
    .catch((erro) => res.send(erro));
});

router.get(
  "/refreshToken",
  cors(corsOptions),
  APIKeyMiddleware,
  TokenMiddleware,
  async (token, req, res, next) => {
    res.set("Content-Type", "application/json");
    if (token) {
      let jwt = await createToken(token);
      res.status(200).send(jwt.jwt);
    } else {
      res.send(500);
    }
  },
);

export default router;
