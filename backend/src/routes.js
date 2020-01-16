const { Router } = require('express');
const DevControlloer = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router();

// Métodos HTTP: GET ( Listar, Receber ), POST(Salvar, Criar), PUT (Editar), DELETE
// Tipos de parametros: 
// Query Params: request.query(filtros, ordenação, paginação);
// Route Params: request.params (Identificar um recurso na alteração ou remoção); 
// Request Body: request.body ( Dados para criação ou alteração de um registro);

routes.get('/devs', DevControlloer.index);
routes.post('/devs', DevControlloer.store);

routes.get('/search', SearchController.index);

module.exports = routes;
