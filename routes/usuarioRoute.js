import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router =  express.Router();

let ctrl =  new UsuarioController();
// Rota GET /usuarios → chama o método listar do controller
router.get("/", ctrl.listar);
// Rota POST /usuarios → chama o método cadastrar do controller
router.post("/", ctrl.cadastrar);
// Rota PUT /usuarios → chama o método atualizar do controller
router.put("/", ctrl.atualizar);
// Rota DELETE /usuarios/:id → chama o método deletar do controller
// OBS: deve ficar por último, porque se vier antes pode "interceptar" rotas parecidas (como /usuarios/algumaCoisa) e causar erro.
router.delete("/:id", ctrl.deletar);

//Exporta o router como exportação padrão deste módulo.
//Isso permite que ele seja importado em server.js e usado como conjunto de rotas.
export default router;