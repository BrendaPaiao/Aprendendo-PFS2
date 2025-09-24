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

    validarToken() {
        
    }
}