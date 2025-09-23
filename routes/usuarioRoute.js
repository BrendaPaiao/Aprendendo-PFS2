import express from 'express';
import UsuarioController from '../controllers/usuarioController';

const router =  express.Router();

let ctrl =  new UsuarioController();
router.get("/", ctrl.listar);

//Exporta o router como exportação padrão deste módulo.
//Isso permite que ele seja importado em server.js e usado como conjunto de rotas.
export default router;