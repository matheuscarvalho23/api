const express    = require('express');
const routes     = express.Router();

const OngController      = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController  = require('./controllers/ProfileController');
const SessionController  = require('./controllers/SessionController');

// GET METHODS
routes.get('/ongs', OngController.index);
routes.get('/incidents', IncidentController.index);
routes.get('/profile', ProfileController.index);
// POST METHODS
routes.post('/ongs', OngController.store);
routes.post('/incidents', IncidentController.store);
routes.post('/sessions', SessionController.store);
// DELETE METHODS
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes