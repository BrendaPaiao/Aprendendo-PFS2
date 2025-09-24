import express from 'express';
import LocacaoController from '../controllers/locacaoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new LocacaoController();
let auth = new AuthMiddleware();
// Define a rota POST / (para iniciar uma locação)
// Middleware auth.validarToken garante que só usuários autenticados podem acessar
router.post("/", auth.validarToken, (req, res) => {

    // #swagger.tags = ['Locação']
    // #swagger.tags = 'Inicia o processo para locar um imóvel'

    /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */

    ctrl.locar(req, res);
})

export default router;