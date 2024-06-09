const express = require('express');
const router = express.Router();
const cocheController = require('../controllers/cocheController');

router.post('/', cocheController.create);
router.get('/:matricula', cocheController.get);
router.put('/:matricula', cocheController.update);
router.delete('/:matricula', cocheController.delete);
router.post('/associate', cocheController.associateUserCar);
router.get('/user/:usermail/cars', cocheController.getUserCars);

module.exports = router;
