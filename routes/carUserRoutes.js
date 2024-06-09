const express = require('express');
const router = express.Router();
const carController = require('../controllers/cocheController');
const userCocheController = require('../controllers/userCocheController'); // Nuevo controlador para coches de usuario
const grupoCocheController = require('../controllers/grupoCocheController');

// Rutas para manejar la relación entre usuarios y coches
router.post('/usercar', carController.associateUserCar);
router.get('/user/:usermail/cars', carController.getUserCars);
router.get('/user-coches', userCocheController.getUserCoches); // Nueva ruta
router.get('/grupos/:grupoId/coches', grupoCocheController.getCochesByGroup);

module.exports = router;
