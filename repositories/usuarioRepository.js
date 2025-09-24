import Database from '../db/database.js';
//Importação da entidade Usuario (classe que representa a tabela de usuários no sistema)
import Usuario from "../entities/usuarioEntity.js";


//O Repository acessa o banco e converte os registros em objetos (molde, nesse caso, do usuário) da Entity
export default class UsuarioRepository {

    // Atributo privado que vai guardar a instância da classe Database
    #banco;

    // No momento em que o repositório é criado,
    // inicializa a conexão com o banco de dados (classe Database)
    constructor() {
        this.#banco = new Database();
    }

    async buscarPorId(id) {
        const sql = "select * from tb_usuario where usu_id = ?";
        const params = [id];

        const rows = await this.#banco.ExecutaComando(sql, params);

        if(rows.length > 0) {
            const row = rows[0];
            const usuario = new Usuario()
        }
    }

    //Aqui iremos buscar todos os usuários no banco e devolver uma lista de objetos Usuario.
    listar() {
    
        return usuarios;
    }

    //Aqui iremos salvar a entidade Usuario recebida no banco.
    cadastrar(usuarioEntidade) {


        usuario.push(usuarioEntidade);
        return true;
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