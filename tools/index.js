import { firebaseAuth} from './firebase.js';
import { createUserWithEmailAndPassword } 
    from "firebase/auth";

function apiKeyMiddleware(req, res, next) {
  let apiKey = req.headers['api_key'];
  if (!apiKey || apiKey !== '123456') { 
    res.status(401).send('API key inválida');
    return;
  }
  next();
}

function criarUsuarioFirebase(email, senha) {


createUserWithEmailAndPassword(
    firebaseAuth, 
    email, 
    senha)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log('Usuário criado com sucesso:', user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Erro ao criar usuário:', 
        errorCode, errorMessage);
    // ..
  });



}    


export { 
    apiKeyMiddleware, 
    criarUsuarioFirebase 
};