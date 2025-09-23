//Sempre colocar o .js no final do arquivo importado
import Usuario from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {

    listar(req, res) {

        // Se alguma linha dentro do try falhar (ex.: erro de banco de dados), a execução é desviada automaticamente para o catch.
        try {
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
        // Se ocorreu algum erro dentro do try, o fluxo vem para cá. "exception" contém os detalhes do erro.
        catch(exception) {
            // Se ocorrer qualquer erro inesperado durante o processamento, mostra no console para debug
            console.log(exception);
            // Retorna erro 500 (Internal Server Error) para o cliente
            res.status(500).json({msg: "Erro ao processar requisiçaõ"});
        }   
    }

    cadastrar(req, res) {
        try {
            // Recupera as informações do usuário enviadas no corpo da requisição (JSON do cliente)
            let {nome, email} = req.body;
            // Verifica se nome e email existem (não estão undefined ou vazios)
            if(nome && email) {
                 // Date.now() gera um número baseado no horário atual
                // Aqui é usado apenas como id temporário (simulando o id que viria do banco)
                let entidade = new Usuario(Date.now(), nome, email);
                // Cria uma instância do repositório para interagir com a "base"
                let usuRepo = new UsuarioRepository();
                // Chama o método cadastrar() do repositório passando a entidade
                let inseriu = usuRepo.cadastrar(entidade);
                if(inseriu == true) {
                    return res.status(200).json({msg: "Usuário cadastrado com sucesso"});
                }
                else {
                    // Se não conseguiu cadastrar, lança um erro
                    // Esse erro será capturado pelo catch abaixo
                    throw new Error("Erro ao cadastrar usuário. Não foi possível persisti-lo no banco de dados");
                }
            }
            else {
                // Caso nome ou email não tenham sido enviados corretamente
                // retorna status 400 (Bad Request), erro do cliente
                return res.status(400).json({msg: "O usuário precisa ter nome e e-mail definidos!"});
            }
        }
        catch(exception) {
            console.log(exception);

            return res.status(500).json({msg: exception.message});
        }
    }

    deletar(req, res) {
        try {
            // Recupera o parâmetro "id" da URL (ex.: DELETE /usuarios/5)
            let {id} = req.params;
            // Cria uma instância do repositório de usuários
            let usuRepo = new UsuarioRepository();
            // Verifica se o usuário existe antes de tentar deletar
            if(usuRepo.buscarPorId(id)) {
                // Se existir, chama o método deletar() no repositório
                usuRepo.deletar(id);

                return res.status(200).json({msg: "Usuário excluído com sucesso!"});
            }
            else {
                return res.status(404).json({msg: "Usuário não encontrado para deleção"});
            }
        }
        catch(exception) {
            console.log(exception);

            return res.status(500).json({msg: exception.message});
        }
    }

    atualizar(req, res) {
        try{
            
            // Recupera os dados enviados no corpo da requisição
            // O cliente precisa enviar id, nome e email
            let {id, nome, email} = req.body;

            // Verifica se todos os campos necessários foram informados
            if(id && nome && email) {
                // Cria uma instância do repositório de usuários
                let repositorio =  new UsuarioRepository();
                // Verifica se o usuário existe no "banco" antes de alterar
                if(repositorio.buscarPorId(id)) {
                    // Cria uma nova entidade Usuario com os dados recebidos
                    let entidade = new Usuario(id, nome, email);
                    // Chama o método alterar() do repositório para atualizar os dados
                    repositorio.alterar(entidade);
                    res.status(200).json({msg: "Usuário alterado!"});
                }
                else {
                    res.status(404).json({msg: "Usuário não encontrado para alteração"});
                }
            }
            else {
                req.status(400).json({msg: "As informações do usuário não estão corretas!"});
            }
        }
        catch(exception) {
            console.log(exception);

            return res.status(500).json({msg: exception.message});
        }
    }


}