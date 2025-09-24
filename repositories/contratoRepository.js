import Database from "../db/database.js";

export default class ContratoRepository {

    #banco;

    set banco(value) {
        this.#banco = value;
    }

    constructor() {
        this.#banco = new Database();
    }

    // Grava um novo contrato no banco
    async gravar(contrato) {
        // Comando SQL para inserir um novo contrato
        // imv_id = id do imóvel, usu_id = id do usuário
        const sql = "insert into tb_contrato(imv_id, usu_id) values(?, ?)";

        // Substitui os "?" pelos valores vindos da entidade Contrato
        const params = [contrato.imovel.id, contrato.usuario.id];

        // Executa o comando no banco e retorna o id do contrato inserido (se deu certo)
        const result = await this.#banco.ExecutaComandoLastInserted(sql, params);

        if(result) {
            // Se inseriu, o result é o novo id gerado pelo banco
            contrato.id = result;

            // Retorna true para indicar que o contrato foi salvo
            return true;
        }
        // Se não conseguiu inserir, retorna false
        return false;
    }
}