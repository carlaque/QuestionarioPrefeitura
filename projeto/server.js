const express = require('express');
const server = express();         
const bodyParser = require('body-parser');

const banco = require('./banco');

//configurando o body parser para pegar POSTS mais tarde
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//inicia o servidor
server.listen(3000);
console.log('API funcionando!');


const router = express.Router();
// router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/:questao', banco.index);
server.use('/', router);
