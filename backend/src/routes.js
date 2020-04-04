const express = require('express');
const connection = require('./database/connection');
const cors = require('cors');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Listar ongs
routes.get('/ongs', OngController.index);

// Cadastrar ong
routes.post('/ongs', OngController.create);

// Listar casos
routes.get('/incidents', IncidentController.index);

// Cadastrar casos
routes.post('/incidents', IncidentController.create);

// Apagar caso
routes.delete('/incidents/:id', IncidentController.delete);


routes.post('/sessions', SessionController.create);

module.exports = routes;