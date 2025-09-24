import jwt from 'jsonwebtoken';

const SECRET = "PFS!1@23#4$PFS";

export default class AuthMiddleware {

    gerarToken(id, email, nome, perfil) {

        let jsonwebtoken = jwt.sign(
            {
                id: id, 
                nome: nome,
                email: email,
                perfil: perfil
            },
            SECRET,
            {
                expiresIn: 300000
            });

            return jsonwebtoken;
    }

    validarToken() {
        
    }
}