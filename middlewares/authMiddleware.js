import jwt from 'jsonwebtoken';

// Chave secreta usada para assinar e validar os tokens JWT
// ⚠️ Importante: em projetos reais essa chave deve ficar em variáveis de ambiente (.env)
const SECRET = "PFS!1@23#4$PFS";

export default class AuthMiddleware {

    // Gera um token JWT contendo os dados básicos do usuário
    gerarToken(id, email, nome, perfil) {
        // jwt.sign(payload, secret, options) → cria o token
        let jsonwebtoken = jwt.sign(
            {
                id: id,         // id do usuário
                nome: nome,     // nome do usuário
                email: email,   // email do usuário
                perfil: perfil  // perfil associado (ex.: admin, aluno, etc.)
            },
            SECRET,             // chave secreta usada para assinar o token
            {
                expiresIn: 300000   // tempo de expiração do token (em segundos ou ms dependendo da lib)
            });

            // Retorna o token gerado para ser enviado ao cliente
            return jsonwebtoken;
    }
    // Middleware responsável por validar o token JWT e garantir que o usuário está logado
    async validarToken(req, res, next) {
        
        // Verifica se existe um cabeçalho "Authorization" na requisição
        if(req.headers.authorization) {
            // Remove a palavra "Bearer " e deixa apenas o token
            let token = req.headers.authorization.replace("Bearer ", "");
            
            try {
                // Valida o token usando a chave secreta e recupera os dados gravados no payload
                let payload = jwt.verify(token, SECRET);
                // Cria uma instância do repositório de usuários
                let usuarioRepository = new UsuarioRepository();
                // Busca o usuário no banco pelo id que veio no payload do token
                let usuario = await usuarioRepository.buscarPorId(payload.id);
                if(usuario) {
                    // Se o usuário existe, verifica se está ativo
                    if(usuario.ativo) {
                        // Anexa o usuário logado ao objeto req (fica disponível nas próximas rotas)
                        req.usuarioLogado = usuario;
                        // Chama o próximo middleware ou controller
                        next();
                    }
                    else {
                        // Se o usuário existe mas está inativo → não pode acessar
                        return res.status(401).json({msg: "Usuário inativo"});
                    }
                }
                else {
                    // Se não encontrou o usuário no banco
                    return res.status(404).json({msg: "Usuário não encontrado"});
                }
            }
            catch(exception) {
                // Se o token for inválido ou expirado
                console.log(exception)
                return res.status(401).json({msg: "Token inválido!"});
            }
        }
        else {
            // Se não tiver cabeçalho Authorization
            return res.status(401).json({msg: "Token não encontrado!"});
        }
    }
}