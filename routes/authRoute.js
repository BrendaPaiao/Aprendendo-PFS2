import express from 'express';
import AutenticacaoController from '../controllers/autenticacaoController.js';

const router = express.Router();

let ctrl = new AutenticacaoController();
router.post("/token", (req, res) => {
    // #swagger.tags = ['Autenticação']
    // #swagger.summary = 'Gera um token de acesso através das credenciais de um usuário'

    ctrl.token(req, res);
});

export default router;