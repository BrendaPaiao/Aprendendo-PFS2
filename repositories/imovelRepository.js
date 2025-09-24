import Database from "../db/database.js";
import Imovel from "../entities/imovel.js";
import Usuario from "../entities/usuario.js";

export default class ImovelRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async listar() {
        const sql = "select * from tb_imovel";

        const rows = await this.#banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i<rows.length; i++) {
            let row = rows[i];
            let imovel = this.toMap(row);
            lista.push(imovel);
        }

        return lista;
    }

    async cadastrar(entidade) {
        const sql = "insert into tb_imovel (imv_descricao, imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?, ?, ?, ?, ?, ?, ?)";

        const params = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async alterar (entidade) {
        const sql = `update tb_imovel set imv_descricao = ?,
                                          imv_cep = ?,
                                          imv_endereco = ?,
                                          imv_bairro = ?,
                                          imv_cidade = ?,
                                          imv_valor = ?,
                                          imv_disponivel = ?
                        where imv_id = ?`
        
        const params = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel, entidade.id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async deletar(id) {
        const sql = "delete from tb_imovel where imv_id = ?";
        const params = [id]; 

        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async obterporId(id) {
        const sql = "select * from tb_imovel where imv_id = ?";
        const params = [id];

        const rows = await this.#banco.ExecutaComando(sql, params);

        if(rows.length > 0) {
            // Como o id é único, espera-se que a consulta retorne no máximo uma linha
            // Converte a primeira linha do resultado em um objeto da entidade (ex.: Imovel)
            let imovel = this.toMap(rows[0]);
            
            // Retorna o objeto já mapeado
            return imovel;
        }

        return null;
    }

    toMap(row) {
        let imovel =  new Imovel();

        imovel.id = row["imv_id"];
        imovel.descricao = row["imv_descricao"];
        imovel.cep = row["imv_cep"];
        imovel.endereco = row["imv_endereco"];
        imovel.cidade = row["imv_cidade"];
        imovel.bairro = row["imv_bairro"];
        imovel.valor = row["imv_valor"];
        imovel.disponivel = row["imv_disponivel"];

        return imovel;
    }
}