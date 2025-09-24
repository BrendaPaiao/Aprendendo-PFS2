import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import jwt from 'jsonwebtoken';

// Controller responsável por autenticação (gerar token JWT)
export default class AutenticacaoController {

    // Repositório para validar credenciais do usuário no banco
    #usuarioRepository;

    constructor() {
        // Instancia o repositório ao criar o controller
        this.#usuarioRepository = new UsuarioRepository();
    }

    // Método responsável por gerar o token de acesso
    async token(req, res) {

        try{
            // Recupera email e senha do corpo da requisição
            let {email, senha} = req.body;
            // Verifica se foram enviados email e senha
            if(email && senha) {
                // Chama o repositório para validar se o usuário existe com essas credenciais
                let usuario = await this.#usuarioRepository.validarAcesso(email, senha);

                if(usuario) {
                    // Se o usuário existe, cria uma instância do AuthMiddleware
                    let auth = new AuthMiddleware();
                    // Gera um token de acesso com os dados básicos do usuário
                    let token = auth.gerarToken(usuario.id, usuario.email, usuario.nome, usuario.perfil.id);

                    // Retorna o token no corpo da resposta com status 200 (OK)
                    return res.status(200).json({token: token});
                }
                else {
                    // Caso não encontre usuário com email/senha informados
                    return res.status(404).json({msg: "Usuário não encontrado"});
                }
            }
            else {
                // Caso não tenha sido informado email ou senha no body
                return res.status(500).json({msg: "Erro ao gerar token de acesso"})
            }
        }
        catch(exception) {
            console.log(exception);

            return res.status(500).json({msg: "Erro ao gerar token de acesso"});
        }
    }
}