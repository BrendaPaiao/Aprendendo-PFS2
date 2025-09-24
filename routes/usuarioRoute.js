import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router =  express.Router();

let ctrl =  new UsuarioController();
// Rota GET /usuarios → chama o método listar do controller
router.get("/", (req, res) => {
    
    // #swagger.tags = ['Usuários']     // Agrupa a rota na aba "Usuário" do Swagger
    // #swagger.summary = 'Listar todos os usuários'      // Título curto da operação

    /* #swagger.responses[404] = {      // Define a resposta HTTP 404 desta rota
        descripition: 'Nenhum usuário encontrado na consulta',
        schema: { $ref: '#/components/schemas/erro'}       // Usa o schema "erro" (definido em components)
    }
    */
    ctrl.listar(req, res);
});
// Rota POST /usuarios → chama o método cadastrar do controller
router.post("/", (req, res) => {

    // #swagger.tags = ['Usuários']
    // #swagger.summary = 'Cadastrar um novo usuário'

    /* #swagger.requestBody = {
        required: true,     // O corpo da requisição é obrigatório
        content: {
            "application/json": {       // Tipo de conteúdo esperado
                schema: { 
                    $ref: '#/components/schemas/usuario'    // Usa o schema "usuario" definido em components
                }
            }
        }
    }
    */
    ctrl.cadastrar(req, res);
});
// Rota PUT /usuarios → chama o método atualizar do controller
router.put("/", (req, res) => {

    // #swagger.tags = ['Usuários']
    // #swagger.summary = 'Altera um usuário existente'
    ctrl.atualizar(req, res);
});
// Rota DELETE /usuarios/:id → chama o método deletar do controller
// OBS: deve ficar por último, porque se vier antes pode "interceptar" rotas parecidas (como /usuarios/algumaCoisa) e causar erro.
router.delete("/:id", (req, res) => {

    // #swagger.tags = ['Usuários']
    // #swagger.summary = 'Deleta permanentemente um usuário'
    ctrl.deletar(req, res);
});
router.get("/:id", (req, res) => {

    // #swagger.tags = ['Usuários']
    // #swagger.summary = 'Recupera um usuário através de um ID'
    ctrl.listar(req, res);
});

//Exporta o router como exportação padrão deste módulo.
//Isso permite que ele seja importado em server.js e usado como conjunto de rotas.
export default router;