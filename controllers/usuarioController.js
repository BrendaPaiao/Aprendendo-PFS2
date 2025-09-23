import UsuarioRepository from "../repositories/usuarioRepository";

export default class UsuarioController {

    listar(req, res) {

        //Cria uma instância do repositório de usuários
        let usuRepo = new UsuarioRepository();
        //Chama o método listar() do repositório para buscar os usuários
        let lista = usuRepo.listar();
        //Se a lista tiver usuários, devolve a resposta em JSON com status 200 (OK)
        if(lista.length > 0) 
            res.status(200).json(lista);
        else
            //Caso a lista esteja vazia, devolvestatus 404 (Not Found) com uma mensagem
            res.status(404).json({msg: "Nenhum usuário foi encontrado!"});
    }
}