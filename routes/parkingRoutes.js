const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Rutas específicas primero
router.get('/last-parking', parkingController.getLastParking);

// Rutas generales después
router.get('/', parkingController.getAllParkings);
router.post('/', parkingController.createParking);
router.get('/:id', parkingController.getParkingById);
router.delete('/:id', parkingController.deleteParkingById);

module.exports = router;
