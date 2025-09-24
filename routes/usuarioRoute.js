import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router =  express.Router();

let ctrl =  new UsuarioController();
// Rota GET /usuarios → chama o método listar do controller
router.get("/", (req, res) => {
    
    // Agrupa a rota na aba "Usuário" do Swagger
    // Título curto da operação
    // Define a resposta HTTP 404 desta rota
    // Usa o schema "erro" (definido em components)

    // #swagger.tags = ['Usuários']     
    // #swagger.summary = 'Listar todos os usuários'      

    /* #swagger.responses[404] = {      
        descripition: 'Nenhum usuário encontrado na consulta',
        schema: { $ref: '#/components/schemas/erro'}       
    }
    */
    ctrl.listar(req, res);
});
// Rota POST /usuarios → chama o método cadastrar do controller
router.post("/", (req, res) => {

    // O corpo da requisição é obrigatório
    // Tipo de conteúdo esperado
    // Usa o schema "usuario" definido em components

    // #swagger.tags = ['Usuários']
    // #swagger.summary = 'Cadastrar um novo usuário'

    /* #swagger.requestBody = {
        required: true,     
        content: {
            "application/json": {       
                schema: { 
                    $ref: '#/components/schemas/usuario'    
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