import app from "../app.js";
import { apiKeyMiddleware } from "../tools/index.js";
import { versionMiddleware, APIKeyMiddleware } from "../utils/index.js";

import { usersRouter } from "./users.js";

setRotas = () => {
  app.use("/users", apiKeyMiddleware, versionMiddleware, usersRouter);
};
