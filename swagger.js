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
swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc);