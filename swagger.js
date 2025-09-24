//Importa a biblioteca swagger-autogen
//→ Gera automaticamente o arquivo de configuração JSON do Swagger a partir do código
import swaggerAutogen from 'swagger-autogen';

//Objeto com as informações básicas da documentação (aparece no /docs)
const doc = {
    //Endereço base da API (porta deve ser igual à do server)
    host:"localhost:5000",
    info: {
        //Título da documentação
        title: "API REST - PFS2",
        //Descrição exibida no Swagger
        description: "API REST para a construção do backend na disciplina de PFS2"
    },
    components: {
        schemas: {
            // Schema "erro": usado para padronizar as respostas de erro da API
            erro: {
                // Exemplo de corpo de resposta que o cliente vai receber em caso de erro
                msg: 'Mensagem de erro'
            },
            // Schema "usuario": descreve a estrutura de um objeto usuário
            usuario: {
                // Exemplo de como um usuário pode ser enviado/recebido pela API
                id: 999,
                nome: "Fulano de Tal",
                email: "fulano@unoeste.br",
                senha: "123abc",
                ativo: true,    // indica se o usuário está ativo (true/false)
                perfil: {
                    id: 1   // chave que liga ao perfil (perfil_id no banco)
                }
            },
            imovel: {
                id: 999,
                descricao: "Casa na praia",
                cep: "19000-000",
                endereco: "Rua dos bobos, número 0",
                bairro: "Bairro teste",
                cidade: "Presidente Prudente",
                valor: 850.60,
                disponivel: "S"
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

// Arquivos que o swagger-autogen vai analisar para gerar a documentação
// Aqui ele vai ler as rotas declaradas dentro do server.js
const routes = ['./server.js'];
// Caminho e nome do arquivo JSON que será gerado automaticamente
// Esse arquivo é usado pelo swaggerUi no server.js
const outputJson = './swaggerOutput.json';
// Gera o arquivo swaggerOutput.json com base nas rotas e nas informações do objeto doc
// openapi: '3.0.0' → padrão da especificação usada
swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc).then(async () => {
    // Após gerar o arquivo de documentação, inicia o servidor da aplicação
    // Usamos import dinâmico porque o projeto está em ESM (type: "module")
    await import("./server.js");
});