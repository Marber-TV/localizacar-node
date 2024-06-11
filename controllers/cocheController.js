const CocheModel = require('../models/cocheModel');
const UserCarModel = require('../models/userCarModel');

class CocheController {
    static create(req, res) {
        const { matricula, marca, color, usermail } = req.body;
        if (!usermail) {
            return res.status(400).json({ message: "usermail is required" });
        }
        CocheModel.create(matricula, marca, color, (err) => {
            if (err) {
                if (err.code === '23505') { // Código para violación de unicidad
                    logMensaje('Coche ya existe con matricula:', matricula);
                    return res.status(400).json({ message: "Coche ya existe con esa matrícula" });
                } else {
                    logMensaje('Error al crear el coche:', err);
                    return res.status(500).json({ message: "Error al crear el coche", error: err.message });
                }
            } else {
                // Asociar el coche al usuario
                UserCarModel.addUserCar(usermail, matricula, (err) => {
                    if (err) {
                        logMensaje('Error al asociar el coche con el usuario:', err);
                        return res.status(500).json({ message: "Error al asociar el coche con el usuario", error: err.message });
                    } else {
                        res.status(201).json({ message: "Coche creado y asociado exitosamente" });
                    }
                });
            }
        });
    }
    static get(req, res) {
        const { matricula } = req.params;
        CocheModel.findByMatricula(matricula, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error al obtener el coche" });
            } else if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: "Coche no encontrado" });
            }
        });
    }

    static update(req, res) {
        const { matricula } = req.params;
        const { marca, color } = req.body;
        CocheModel.update(matricula, marca, color, (err) => {
            if (err) {
                res.status(500).json({ message: "Error al actualizar el coche" });
            } else {
                res.json({ message: "Coche actualizado exitosamente" });
            }
        });
    }

    static delete(req, res) {
        const { matricula } = req.params;
        CocheModel.delete(matricula, (err) => {
            if (err) {
                res.status(500).json({ message: "Error al eliminar el coche" });
            } else {
                res.status(204).end();
            }
        });
    }

    // Nuevo método para asociar un coche existente a un usuario
    static associateUserCar(req, res) {
        const { usermail, matricula } = req.body;
        UserCarModel.addUserCar(usermail, matricula, (err) => {
            if (err) {
                res.status(500).json({ message: "Error al asociar el coche con el usuario" });
            } else {
                res.status(201).json({ message: "Coche asociado exitosamente al usuario" });
            }
        });
    }

    // Nuevo método para obtener todos los coches de un usuario
    static getUserCars(req, res) {
        const { usermail } = req.params;
        UserCarModel.findUserCars(usermail, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error al obtener los coches del usuario" });
            } else {
                res.json(results);
            }
        });
    }
}

module.exports = CocheController;
