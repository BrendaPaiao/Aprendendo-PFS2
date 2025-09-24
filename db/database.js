import mysql from 'mysql2'

// Classe responsável por gerenciar a conexão e execução de comandos no banco de dados
export default class Database {

    // Atributo privado que guarda o pool (pool de conexões é um conjunto de conexões de banco de dados pré-estabelecidas e prontas para uso, mantidas em um cache, que são emprestadas e reutilizadas por um aplicativo em vez de abri-las e fechá-las para cada tarefa) de conexões
    #conexao;

    // Getter e Setter para acessar/alterar a conexão se necessário
    get conexao() { return this.#conexao; } 
    set conexao(conexao) { this.#conexao = conexao; }

    // Cria um pool de conexões com o banco (melhor que abrir/fechar toda hora)
    constructor() {

        this.#conexao = mysql.createPool({
            host: '132.226.245.178',     // endereço do servidor MySQL
            database: 'PFS2_106888',             // nome do banco
            user: '106888',                 // usuário do banco
            password: '106888',             // senha do banco
            idleTimeout: 30000,          // tempo para encerrar conexões inativas
            connectionLimit: 50          // máximo de conexões simultâneas
        });
    }

    // Executa consultas que retornam dados (ex.: SELECT)
    // Retorna os registros encontrados como array de objetos
    ExecutaComando(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results);
            });
        });
    }

    // Executa comandos que não retornam registros (ex.: UPDATE, DELETE)
    // Retorna true se afetou pelo menos uma linha, false caso contrário
    ExecutaComandoNonQuery(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if(error)
                    rej(error);
                else
                    res(results.affectedRows > 0);
            });
        });
    }

    // Executa INSERTs que geram id automático (AUTO_INCREMENT)
    // Retorna o último id inserido no banco
    ExecutaComandoLastInserted(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error)
                    rej(error);
                else
                    res(results.insertId);
            });
        });
    }
}