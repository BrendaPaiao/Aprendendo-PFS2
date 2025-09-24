import Database from "../db/database.js"
import Aluguel from "../entities/aluguel.js";
import Contrato from "../entities/contrato.js";

export default class AluguelRepository {


    #banco;

    //para transações
    set banco(value) {
        this.#banco = value;
    } 

    constructor() {
        this.#banco = new Database();
    }

    async gravar(aluguel) {

        const sql = "insert into tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) values (?, ?, ?, ?, ?)";

        const valores = [aluguel.mes, aluguel.vencimento, aluguel.valor, aluguel.pago, aluguel.contrato.id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listarPorUsuario(idUsuario) {

        const sql = "select * from tb_aluguel a inner join tb_contrato c on a.ctr_id = c.ctr_id where c.ctr_id = ?";

        const valores = [idUsuario];

        const rows = await this.#banco.ExecutaComando(sql, valores);
        let lista = [];

        for(let i =0; i< rows.length; i++) {
            lista.push(this.toMap(rows[i]));
        }

        return lista;
    }

    async marcarComoPago(idAluguel) {

        const sql = "update tb_aluguel set alu_pago = 'S' where alu_id = ?";
        const valores = [idAluguel];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(row) {
        let aluguel = new Aluguel();
        aluguel.id = row["alu_id"];
        aluguel.mes = row["alu_mes"];
        aluguel.valor = row["alu_valor"];
        aluguel.pago = row["alu_pago"];
        aluguel.vencimento = row["alu_vencimento"];
        aluguel.contrato = new Contrato();
        aluguel.contrato.id = row["ctr_id"];

        return aluguel;
    }
}