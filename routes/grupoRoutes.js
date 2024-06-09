const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');
const mensajeController = require('../controllers/mensajeController');
const grupoUsuarioController = require('../controllers/grupoUsuarioController');
const grupoCocheController = require('../controllers/grupoCocheController');

// Rutas de grupos
router.post('/', grupoController.createGrupo);
router.get('/:id', grupoController.getGrupoById);
router.delete('/:id', grupoController.deleteGrupoById);

// Rutas de mensajes
router.get('/:grupoId/mensajes', mensajeController.getAllMensajesByGrupo);
router.post('/:grupoId/mensajes', mensajeController.createMensaje);

// Rutas de participantes
router.post('/:grupoId/usuarios', grupoUsuarioController.addUsuarioToGrupo);
router.delete('/:grupoId/usuarios', grupoUsuarioController.removeUsuarioFromGrupo);

// Rutas de coches
router.post('/:grupoId/coches', grupoCocheController.addCocheToGrupo);
router.delete('/:grupoId/coches', grupoCocheController.removeCocheFromGrupo);
router.get('/:grupoId/coches', grupoCocheController.getCochesByGroup);
router.get('/grupos/:grupoId/coches', grupoCocheController.getCochesByGroup);

module.exports = router;
