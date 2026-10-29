import { jwtVerify, decodeJwt, SignJWT } from "jose";
import { createSecretKey } from "crypto";
import { v4 as uuidv4 } from "uuid";
//import logger from "./logger.js";
import { version } from "../versao.js";

const corsOptions = {
  origin: ["http://localhost:8080", "https://meuservidor.com.br"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const validadeToken = 900; // 5 minutos

const api_key = process.env.api_key;
const tokenSecret = process.env.tokenSecret;
const secret = createSecretKey(tokenSecret, "utf-8");

//Middleware para testar API Key
const APIKeyMiddleware = (req, res, next) => {
  if (req.get("ApiKey") != api_key) {
    res.sendStatus(401);
    return false;
  } else {
    next();
  }
};

//Descriptador de Token JWT
const openTokenJWT = (jwt) => {
  return new Promise((resolve, reject) => {
    jwtVerify(jwt, secret, { algorithms: ["HS256"] })
      .then((result) => {
        resolve(result.payload);
      })
      .catch((error) => {
        if (error.code == "ERR_JWT_EXPIRED") {
          reject("Token de acesso expirado " + error.code);
        } else {
          reject("Token de acesso inválido " + error.code);
        }
      });
  });
};
/* outra forma de escrever a mesma função
function openTokenJWT(jwt) {
  return new Promise((resolve, reject) => {
    jwtVerify(jwt, secret, { algorithms: ["HS256"] })
      .then((result) => {
        resolve(result.payload);
      })
      .catch((error) => {
        if (error.code == "ERR_JWT_EXPIRED") {
          reject("Token de acesso expirado " + error.code);
        } else {
          reject("Token de acesso inválido " + error.code);
        }
      });
  });
};
*/

//Middleware para testar presença do Token JWT
const TokenMiddleware = (req, res, next) => {
  const authorization = req.get("Authorization");
  const token = authorization ? authorization.split(" ")[1] : "";
  openTokenJWT(token)
    .then((payload) => {
      next(payload, req, res);
    })
    .catch((error) => {
      logger.error("Erro no jwtVerify " + req.baseUrl, error);

      res.status(498).send(error);
    });
};

const TokenIsAdminMiddleware = (token, req, res, next) => {
  if (token.isAdmin && token.nivelAdmin > 0) {
    next(token, req, res);
  } else {
    res.status(403).send("Usuário não é Admin");
  }
};

//Cria um token JWT
const createToken = async (data) => {
  const secret = createSecretKey(tokenSecret, "utf-8");
  let jwt = undefined;
  if (!data.jti) {
    data.jti = uuidv4();
  }
  if (!data.sub) {
    data.sub =
      "Login dia " +
      new Date().toLocaleDateString() +
      " " +
      new Date().toLocaleTimeString();
  }
  try {
    jwt = await new SignJWT(data)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setSubject(data.sub)
      .setJti(data.jti)
      .setExpirationTime(validadeToken + "s")
      .sign(secret);
  } catch (error) {
    logger.error("Erro ao criar o token JWT", error);
  }
  return { jwt: jwt, jti: data.jti };
};

// converte um array de object Javascript em CSV
function toCSV(objectsArray) {
  let attr = Object.keys(objectsArray[0]);
  let ret = attr.join(";") + "\n";
  objectsArray.forEach((item) => {
    let values = [];
    attr.forEach((key) => {
      values.push(item[key] ? item[key] : "");
    });
    ret += values.join(";") + "\n";
  });
  return ret;
}
//Middleware para adicionar a versão no header da resposta
function versionMiddleware(req, res, next) {
  res.setHeader("X-Powered-By", `Nossa API v${version}`);
  res.setHeader("X-API-Version", version);
  next();
}

export {
  corsOptions,
  api_key,
  tokenSecret,
  validadeToken,
  createToken,
  APIKeyMiddleware,
  TokenMiddleware,
  TokenIsAdminMiddleware,
  openTokenJWT,
  toCSV,
  versionMiddleware,
};
