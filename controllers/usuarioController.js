//Sempre colocar o .js no final do arquivo importado
import Perfil from "../entities/perfil.js";
import Usuario from "../entities/usuario.js";
import ImovelRepository from "../repositories/imovelRepository.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {

    #repositorio;

    constructor() {
        // Cria uma instância do repositório de usuários
        this.#repositorio = new UsuarioRepository();

        // Caso seja necessário, aqui também poderiam ser criados
        // outros repositórios (ex.: ProdutoRepository, PedidoRepository, etc.)
        // para que este service/controller possa trabalhar com mais entidades.
    }

    async listar(req, res) {

        // Mostra no console os parâmetros recebidos na query string da URL
        // Exemplo: GET /usuarios?ativo=1&perfil=admin
        // req.query = { ativo: "1", perfil: "admin" }
        //console.log(req.query);

        // Se alguma linha dentro do try falhar (ex.: erro de banco de dados), a execução é desviada automaticamente para o catch.
        try {
            //Chama o método listar() do repositório para buscar os usuários
            let lista = await this.#repositorio.listar();
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
            res.status(500).json({msg: "Erro ao processar requisição"});
        }   
    }

    async cadastrar(req, res) {
        try {
            // Recupera as informações do usuário enviadas no corpo da requisição (JSON do cliente)
            let {nome, email, senha, ativo, perfil} = req.body;
            // Verifica se nome e email existem (não estão undefined ou vazios)
            if(nome && email && senha && ativo && perfil && perfil.id) {

                let entidade = new Usuario(0, nome, email, senha, ativo, new Perfil(perfil.id));
                // Chama o método cadastrar() do repositório passando a entidade
                let inseriu = await this.#repositorio.cadastrar(entidade);
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

    async deletar(req, res) {
        try {
            // Recupera o parâmetro "id" da URL (ex.: DELETE /usuario/5)
            let {id} = req.params;
            // Verifica se o usuário existe antes de tentar deletar
            if(await this.#repositorio.buscarPorId(id)) {
                // Se existir, chama o método deletar() no repositório
                if(await this.#repositorio.deletar(id))
                    return res.status(200).json({msg: "Usuário excluído com sucesso!"});
                else
                    throw new Error("Erro ao deletar usuário no banco de dados")
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

    async atualizar(req, res) {
        try{
            // Recupera os dados enviados no corpo da requisição
            // O cliente precisa enviar id, nome e email
            let {id, nome, email, senha, ativo, perfil} = req.body;

            // Verifica se todos os campos necessários foram informados
            if(id && nome && email && senha && ativo && perfil && perfil.id) {
                // Verifica se o usuário existe no "banco" antes de alterar
                if(await this.#repositorio.buscarPorId(id)) {
                    // Cria uma nova entidade Usuario com os dados recebidos
                    let entidade = new Usuario(id, nome, email, ativo, new Perfil(perfil.id));
                    // Chama o método alterar() do repositório para atualizar os dados
                    if(await this.#repositorio.alterar(entidade))
                        res.status(200).json({msg: "Usuário alterado!"});
                    else
                        throw new Error("Erro ao alterar usuário no banco de dados");
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

    async obterPorId(req, res) {
        try {
            let {id} = req.params;
            let usuario = await this.#repositorio.buscarPorId(id);
            if(usuario) {
                return res.status(200).json(usuario);
            }
            else
                return res.status(404).json({msg: "Usuário não encontrado!"});
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: exception.message});
        }
    }
}