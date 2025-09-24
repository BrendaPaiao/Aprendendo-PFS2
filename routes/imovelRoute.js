import express from 'express';
import ImovelController from '../controllers/imovelController.js';

const router = express.Router();

let ctrl = new ImovelController();
router.get("/", (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Lista todos os imóveis cadastrados'
    ctrl.listar(req, res);
})

router.post("/", (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Cadastra um novo imóvel'
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/imovel'
                }
            }
        }
    }
    */
    ctrl.cadastrar(req, res);
})

router.put("/", (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Altera um imóvel existente'
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/imovel'
                }
            }
        }
    }
    */
    ctrl.alterar(req, res)
})

router.delete("/:id", (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Exclui um imóvel existente'

    ctrl.deletar(req, res);
})

router.get("/:id", (req, res) => {

    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Busca um imóvel pelo id'

    ctrl.obterPorId(req, res);
})

export default router;