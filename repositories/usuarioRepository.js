//Importação da entidade Usuario (classe que representa a tabela de usuários no sistema)
import Usuario from "../entities/usuarioEntity.js";

//O Repository acessa o banco e converte os registros em objetos (molde, nesse caso, do usuário) da Entity
export default class UsuarioRepository {

    buscarPorId(id) {
        let usuario = usuario.filter(x=> x.id == id);

        return usuario.length > 0;
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