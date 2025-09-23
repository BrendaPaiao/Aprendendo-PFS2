//OBS: Aqui usamos "import express from 'express';" porque o projeto está no modo ESM.
//Isso é definido em package.json com "type": "module".
//No PFS I usávamos CommonJS → const express = require('express');
//Diferença: ESM (import/export) é o padrão moderno do JS, enquanto CommonJS (require/module.exports) é o padrão antigo do Node.
import express from 'express';
const server = express();

server.listen(5000, function() {
    console.log("Backend em funcionamento!");
});