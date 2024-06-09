const ParkingModel = require('../models/parkingModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class ParkingController {
    getAllParkings(req, res) {
        ParkingModel.getAllParkings((err, data) => {
            if (err) {
                res.status(500).json(Respuesta.error(null, 'Error al recuperar los datos:' + req.originalUrl));
            } else {
                res.json(Respuesta.exito(data, 'Listado de estacionamientos recuperado'));
            }
        });
    }

    createParking(req, res) {
        const parkingData = req.body;

        ParkingModel.createParking(parkingData, (err, result) => {
            if (err) {
                res.status(500).json(Respuesta.error(null, 'Error al crear el estacionamiento:' + req.originalUrl));
            } else {
                res.status(201).json(Respuesta.exito({ id: result.insertId, ...parkingData }, 'Estacionamiento creado exitosamente'));
            }
        });
    }

    getParkingById(req, res) {
        const parkingId = req.params.id;
        ParkingModel.getParkingById(parkingId, (err, parking) => {
            if (err) {
                res.status(500).json(Respuesta.error(null, 'Error al recuperar el estacionamiento:' + req.originalUrl));
            } else if (!parking) {
                res.status(404).json(Respuesta.error(null, 'Estacionamiento no encontrado'));
            } else {
                res.json(Respuesta.exito(parking, 'Estacionamiento recuperado'));
            }
        });
    }

    deleteParkingById(req, res) {
        const parkingId = req.params.id;

        ParkingModel.deleteParkingById(parkingId, (err, result) => {
            if (err) {
                logMensaje('Error al eliminar el estacionamiento con ID: ' + parkingId, err);
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el estacionamiento:' + req.originalUrl));
            }

            if (result.affectedRows === 0) {
                logMensaje('Intento de eliminación de un estacionamiento no encontrado con ID: ' + parkingId);
                return res.status(404).json(Respuesta.error(null, 'Estacionamiento no encontrado: ' + parkingId));
            }

            logMensaje('Estacionamiento eliminado con éxito con ID: ' + parkingId);
            return res.status(204).end();
        });
    }

    getLastParking(req, res) {
        const { usermail } = req.query;

        ParkingModel.getLastParkingByEmail(usermail, (err, parking) => {
            if (err) {
                res.status(500).json({ message: "Error en el servidor al obtener la última ubicación de aparcamiento" });
            } else if (parking) {
                res.json(parking);
            } else {
                res.status(404).json({ message: "No se encontró la última ubicación de aparcamiento para el usuario" });
            }
        });
    }
}

module.exports = new ParkingController();
