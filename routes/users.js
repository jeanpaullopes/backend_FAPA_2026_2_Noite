import express from 'express';
import { apiKeyMiddleware } from '../tools/index.js';
import { criarUsuarioFirebase } from '../tools/index.js';

const version = '1.0.0';
const usersRouter = express.Router();

function versionMiddleware(req, res, next) {
  res.setHeader("X-Powered-By", `Nosso Backend API v${version}`);
  res.setHeader("X-API-Version", version);
  next();
}


/* GET users listing. */
usersRouter.get('/', 
  versionMiddleware,
  function(req, res, next) {
  res.send('respond with a resource');
});
usersRouter.post('/', 
  apiKeyMiddleware,
  function(req, res, next){

    if (!req.body) {
      res.status(400).send('Requisição inválida: corpo da requisição ausente');
      return;
    }
    if (!req.body.email || !req.body.senha) {
      res.status(400).send('Requisição inválida: email ou senha ausente');
      return;
    }


    criarUsuarioFirebase(
      req.body.email, 
      req.body.senha);
  res.status(201).send('você é o usuário logado! ');
});


usersRouter.get('/you', 
  apiKeyMiddleware,
  function(req, res, next){
    
  res.send('eu sou o Backend! ');
});



export { usersRouter };
