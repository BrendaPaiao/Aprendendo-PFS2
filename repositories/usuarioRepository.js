import Database from '../db/database.js';
//Importação da entidade Usuario (classe que representa a tabela de usuários no sistema)
import Perfil from '../entities/perfil.js';
import Usuario from "../entities/usuario.js";


//O Repository acessa o banco e converte os registros em objetos (molde, nesse caso, do usuário) da Entity
export default class UsuarioRepository {

    // Atributo privado que vai guardar a instância da classe Database
    #banco;

    // No momento em que o repositório é criado,
    // inicializa a conexão com o banco de dados (classe Database)
    constructor() {
        this.#banco = new Database();
    }

    async validarAcesso(email, senha) {

        const sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        const params = [email, senha];

        const row = await this.#banco.ExecutaComando(sql, params);

        if(row.length > 0) {
            return this.toMap(row[0]);
        }

        return null;
    }

    //// Busca um usuário no banco de dados pelo id
    async buscarPorId(id) {
        // Comando SQL para selecionar o usuário cujo id corresponde ao informado
        const sql = "select * from tb_usuario where usu_id = ?";
        // "id" vem como parâmetro da função buscarPorId(id)
        // Ele representa o identificador único do usuário no banco (usu_id)
        // O valor é passado no array "params" para substituir o "?" na query SQL
        const params = [id];

        // Executa a query usando o objeto #banco (classe Database)
        // Retorna um array de linhas (rows)
        const rows = await this.#banco.ExecutaComando(sql, params);

        // Se encontrou pelo menos um registro...
        if(rows.length > 0) {
            // Pega a primeira linha do resultado
            const row = rows[0];

           // Converte a linha retornada do banco (row) em um objeto Usuario completo, sem precisar ficar escrevendo várias vezes e repetindo código, função por função.
            const usuario = this.toMap(row);

            // Retorna o objeto Usuario montado
            return usuario;
        }

        // Se não encontrou nenhum registro, retorna null
        return null;
    }

    //Aqui iremos buscar todos os usuários no banco e devolver uma lista de objetos Usuario.
    async listar() {
    
        // Comando SQL que retorna todos os registros da tabela de usuários
        const sql = "select * from tb_usuario";

        const rows = await this.#banco.ExecutaComando(sql);
        // Array para armazenar os objetos Usuario que vamos criar
        let usuarios = [];

        // Percorre cada linha retornada do banco
        for(let i = 0; i<rows.length; i++) {
            const row = rows[i];

            // Para cada linha, cria um novo objeto Usuario e também instancia um Perfil a partir da chave estrangeira "per_id"
            usuarios.push(this.toMap(row));
        }

        // Retorna a lista de objetos Usuario já convertidos
        return usuarios;
    }

    //Aqui iremos salvar a entidade Usuario recebida no banco.
    async cadastrar(usuarioEntidade) {
         // Comando SQL para inserir um novo usuário na tabela
        const sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha, usu_ativo, per_id) values (?, ?, ?, ?, ?)";

        // Parâmetros que substituem os "?" na query
        // Pegamos os dados diretamente da entidade Usuario recebida como parâmetro
        const params = [usuarioEntidade.nome, usuarioEntidade.email, usuarioEntidade.senha, usuarioEntidade.ativo, usuarioEntidade.perfil.id];

        // Executa o comando no banco usando a classe Database
        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        // Retorna true para indicar que o cadastro foi realizado
        // (a função ExecutaComandoNonQuery retorna se houve linhas afetadas)
        return result;
    }

    // Exclui um usuário do banco a partir do id informado
    async deletar(id) {
        // Comando SQL para remover um usuário com base no seu id
        const sql = "delete from tb_usuario where usu_id = ?";
        const params = [id];

        // ExecutaComandoNonQuery retorna true se alguma linha foi afetada, false caso contrário
        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        // Retorna true (usuário encontrado e deletado) ou false (usuário não existia)
        return result;
    }

    // Atualiza os dados de um usuário no banco
    async alterar(entiAtualizada) {
        // Comando SQL para atualizar os campos do usuário
        const sql = `update tb_usuario set usu_nome = ?, 
                                            usu_email =?,
                                            usu_senha= ?, 
                                            usu_ativo= ?,
                                            per_id = ?
                    where usu_id = ?`

        // Array com os valores que vão substituir os "?" da query
        // Eles vêm do objeto Usuario recebido como parâmetro (entiAtualizada)
        const params = [entiAtualizada.nome,
                            entiAtualizada.email,
                            entiAtualizada.senha, 
                            entiAtualizada.ativo, 
                            entiAtualizada.perfil.id,
                            entiAtualizada.id   // usado no WHERE para saber qual usuário alterar
        ];
        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    toMap(row) {
        // Cria uma nova instância da entidade Usuario vazia
        let usuario = new Usuario();

        // Mapeia os campos da linha (row) para os atributos da entidade
        usuario.id = row["usu_id"];
        usuario.nome = row["usu_nome"];
        usuario.email = row["usu_email"];
        usuario.senha = row["usu_senha"];
        usuario.ativo = row["usu_ativo"];
        // Cria um objeto Perfil associado ao usuário, com base no per_id vindo do banco
        usuario.perfil = new Perfil(row ["per_id"]);
        // Se a consulta também trouxe a descrição do perfil (JOIN com tb_perfil),
        // atribui esse valor ao objeto perfil
        if(row["per_descricao"]) {
            usuario.perfil.descricao = row["per_descricao"];
        }

        // Retorna o objeto Usuario completo, pronto para ser usado na aplicação
        return usuario;
    }

}