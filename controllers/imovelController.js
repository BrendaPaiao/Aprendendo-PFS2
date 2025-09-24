import Imovel from "../entities/imovel.js";
import ImovelRepository from "../repositories/imovelRepository.js";

export default class ImovelController {

    #repositorio;

    constructor() {
        this.#repositorio = new ImovelRepository();
    }

    async listar(req, res) {
        try {
            let lista = await this.#repositorio.listar();
            if(lista.length > 0)
                return res.status(200).json(lista);
            else
                return res.status(404).json({msg: "Nenhum imóvel encontrado"};)
        }
        catch(exception) {
            console.log(exception);
            return req.status(500).json({msg: "Erro ao processar requisiçaõ"});
        }
    }

    async cadastrar(req, res) {
        try{
            let {descricao, cep, endereco, bairro, cidade, valor, disponivel} = req.body;

            if(descricao && cep && endereco && bairro && cidade && valor && disponivel) {
                let imovel = new Imovel();
                imovel.descricao = descricao;
                imovel.cep = cep;
                imovel.endereco = endereco;
                imovel.bairro = bairro;
                imovel.cidade = cidade;
                imovel.valor = valor;
                imovel.disponivel = disponivel;

                if(await this.#repositorio.cadastrar(imovel) == true) {
                    return res.status(200).json({msg: "Imóvel cadastrado com sucesso"});
                }
                else {
                    throw new Error("Erro ao gravar imóvel no banco de dados");
                }
            }
            else {
                return res.status(400).json({msg: "Faltam informações para prosseguir com o cadastro"});
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: "Erro ao processar requisição"}); 
        }
    }

    async alterar(req, res) {
        try{
            let {id, descricao, cep, endereco, bairro, cidade, valor, disponivel} = req.body;

            if(id && descricao && cep && endereco && bairro && cidade && valor && disponivel) {
                let imovel = new Imovel();
                imovel.id = id;
                imovel.descricao = descricao;
                imovel.cep = cep;
                imovel.endereco = endereco;
                imovel.bairro = bairro;
                imovel.cidade = cidade;
                imovel.valor = valor;
                imovel.disponivel = disponivel;

                if(await this.#repositorio.obterPorId(imovel.id) != null) {
                    if(await this.#repositorio.alterar(imovel) == true) {
                        return res.status(200).json({msg: "Imóvel alterado com sucesso"});
                    }
                    else {
                        throw new Error("Erro ao alterar imóvel no banco de dados");
                    }
                }
                else {
                    res.status(404).json({msg: "Imóvel não encontrado para alteração!"});
                }


            }
            else{
                return res.status(400).json({msg: "Faltam informações para prosseguir com o cadastro"});
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: "Erro ao processar requisição"}); 
        }
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            if(await this.#repositorio.obterPorId(id) != null) {

                if(await this.#repositorio.deletar(id)) {
                    return res.status(200).json({msg: "Imóvel deletado com sucesso!"});
                }
                else
                    throw new Error("Erro excluir imóvel");
            }
            else {
                return res.status(404).json({msg: "Imóvel não encontrado para a deleção"});
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: "Erro ao processar requisição"}); 
        }
    }

    async obterPorId(req, res) {
        try{
            let {id} = req.params;

            let imovel = await this.#repositorio.obterPorId(id);
            if(imovel != null) {
                return res.status(200).json(imovel);
            }
            else {
                return res.status(404).json({msg: "Imóvel não encontrado!"});
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: "Erro ao processar requisição"}); 
        }
    }
}