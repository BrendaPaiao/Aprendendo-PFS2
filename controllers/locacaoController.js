import Database from "../db/database.js";
import Aluguel from "../entities/aluguel.js";
import Contrato from "../entities/contrato.js";
import AluguelRepository from "../repositories/aluguelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js";

export default class LocacaoController {
    // Repositório de imóveis (para buscar/verificar os dados do imóvel)
    #imovelRepository;
    // Repositório de contratos (para gravar/consultar contratos no banco)
    #contratoRepository;
    #aluguelRepository;

   constructor(){
        // Instancia o repositório de imóveis
        this.#imovelRepository = new ImovelRepository();
        // Instancia o repositório de contratos
        this.#contratoRepository = new ContratoRepository();
        this.#aluguelRepository = new AluguelRepository();
   }

   // Método responsável por iniciar o processo de locação de um imóvel
   async locar(req, res) {
        let banco = new Database();
        try{
            // Recupera o id do imóvel do corpo da requisição
            this.#aluguelRepository.banco = banco;
            this.#contratoRepository.banco = banco;
            this.#imovelRepository.banco = banco;
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
                    await banco.AbreTransacao();
                    // Tenta gravar o contrato no banco
                    if(await this.#contratoRepository.gravar(contrato)) {
                        for(let i =1; i<=12; i++) {
                            let aluguel = new Aluguel();
                            aluguel.valor = imovel.valor;
                            aluguel.contrato = contrato;
                            aluguel.pago = "N";
                            let dataAtual = new Date();
                            dataAtual.setMonth(dataAtual.getMonth() + i);
                            let mes = dataAtual.getMonth() + 1;
                            aluguel.mes = mes;
                            aluguel.vencimento = dataAtual;

                            if(await this.#aluguelRepository.gravar(aluguel) == false)
                                throw new Error(`Erro ao gerar o aluguel do mês ${mes}`);
                        }

                        imovel.disponivel = "N";
                        if(await this.#imovelRepository.alterar(imovel)) {
                            await banco.Commit();
                            res.status(200).json({msg: "Imóvel locado com sucesso!"});
                        }
                        else
                            throw new Error("Erro ao atualizar situação do imóvel");
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
        catch(exception) {
            await banco.Rollback();
            console.log(exception);
            return res.status(500).json({msg: "Erro durante o processo de locação"})
        }
    }
}