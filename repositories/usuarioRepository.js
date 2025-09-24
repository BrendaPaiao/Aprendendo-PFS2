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
            // Cria um objeto Usuario a partir dos dados retornados do banco
            // Repare que também cria um objeto Perfil, passando o per_id
            const usuario = new Usuario(
                row["usu_id"], 
                row["usu_nome"], 
                row["usu_email"], 
                row["usu_senha"], 
                row["usu_ativo"], 
                new Perfil(row["per_id"]));

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
            usuarios.push(
                new Usuario(row["usu_id"], 
                row["usu_nome"], 
                row["usu_email"], 
                row["usu_senha"], 
                row["usu_ativo"], 
                new Perfil(row["per_id"])));
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

    deletar(id) {
        usuarios = usuarios.filter(x=> x.id != id);
    }

    alterar(entidadeAtualizada) {
        for(let i = 0; i<usuario.lenght; i++) {
            if(usuarios[i].id == entidadeAtualizada.id) {
                usuarios[i] = entidadeAtualizada;
            }
        }
    }
}