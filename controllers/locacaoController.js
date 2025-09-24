import Contrato from "../entities/contrato";
import ContratoRepository from "../repositories/contratoRepository";
import ImovelRepository from "../repositories/imovelRepository";

export default class LocacaoController {
    // Repositório de imóveis (para buscar/verificar os dados do imóvel)
    #imovelRepository;
    // Repositório de contratos (para gravar/consultar contratos no banco)
    #contratoRepository;

   constructor(){
        // Instancia o repositório de imóveis
        this.#imovelRepository = new ImovelRepository();
        // Instancia o repositório de contratos
        this.#contratoRepository = new ContratoRepository();
   }

   // Método responsável por iniciar o processo de locação de um imóvel
   async locar(req, res) {
        try{
            // Recupera o id do imóvel do corpo da requisição
            let {idImovel} = req.body;
            // Verifica se o id foi enviado
            if(idImovel) {
                 // Busca o imóvel no banco pelo id
                let imovel = await this.#imovelRepository.obterporId(idImovel);
                // Verifica se o imóvel existe e está disponível ("S")
                if(imovel && imovel.disponivel == "S") {
                    // Inicia o processo de locação
                    let contrato = new Contrato();
                    // Associa o imóvel encontrado ao contrato
                    contrato.imovel = imovel;
                    // Associa o usuário logado ao contrato
                    // (esse usuário vem do middleware que validou o token JWT)
                    contrato.usuario = req.usuarioLogado;
                    // Tenta gravar o contrato no banco
                    if(await this.#contratoRepository.gravar(contrato)) {
                        // Se gravou com sucesso, aqui entraria a lógica para gerar o aluguel
                    }
                    else
                         // Se não conseguiu salvar, lança um erro
                        throw new Error("Erro ao gerar contrato no banco!");
                }
                else{
                    // Retorna erro caso o imóvel não exista ou não esteja disponível
                    return res.status(400).json({msg: "Imóvel inválido para locação!"})
                }
            }
            else{
                // Retorna erro se o id do imóvel não foi enviado no body
                return res.status(400).json({msg: "O Id do imóvel não foi enviado!"})
            }

        }
        catch(ex) {
            console.log(ex);
            return res.status(500).json({msg: "Erro durante o processo de locação"})
        }
    }
}