// controllers/userCocheController.js
const UserModel = require('../models/userModel');
const Respuesta = require('../utils/respuesta');

class UserCocheController {
    getUserCoches(req, res) {
        const { usermail } = req.query;

        if (!usermail) {
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        UserModel.getUserCars(usermail, (err, coches) => {
            if (err) {
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los coches del usuario'));
            }
            res.json(Respuesta.exito(coches, 'Listado de coches del usuario recuperado'));
        });
    }
}

module.exports = new UserCocheController();
