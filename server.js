// OBS: Aqui usamos "import express from 'express';" porque o projeto está no modo ESM.
// Isso é definido em package.json com "type": "module".
// No PFS I usávamos CommonJS → const express = require('express');
// Diferença: ESM (import/export) é o padrão moderno do JS, enquanto CommonJS (require/module.exports) é o padrão antigo do Node.
import express from 'express';
import usuarioRouter from './routes/usuarioRoute.js';
import imovelRouter from './routes/imovelRoute.js';
import authRouter from './routes/authRoute.js';
// Importa o middleware de UI do Swagger
import swaggerUi from 'swagger-ui-express';
// Como o projeto está em ESM, usamos createRequire para poder usar "require" aqui (isso permite carregar arquivos/formatos que são mais fáceis via require, como JSON sem assert)
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// Carrega o JSON gerado do Swagger (ex.: por swagger-autogen)
const outputJson = require('./swaggerOutput.json');
const server = express();

server.use(express.json());

// Registra a rota /docs para servir a interface do Swagger com o JSON acima
server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
server.use("/usuario", usuarioRouter);
server.use("/imovel", imovelRouter);
server.use("/autenticacao", authRouter);

server.listen(5000, function() {
    console.log("Backend em funcionamento!");
});