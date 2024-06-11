const GrupoCocheModel = require('../models/grupoCocheModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class GrupoCocheController {
    addCocheToGrupo(req, res) {
        const { grupoId } = req.params;
        const { matricula } = req.body;

        if (!matricula) {
            logMensaje('Matricula es requerido');
            return res.status(400).json(Respuesta.error(null, 'matricula es requerido'));
        }

        logMensaje(`Agregando coche con matricula ${matricula} al grupo ${grupoId}`);
        GrupoCocheModel.addCocheToGrupo(grupoId, matricula, (err, result) => {
            if (err) {
                logMensaje('Error al agregar el coche al grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al agregar el coche al grupo'));
            }
            logMensaje('Coche agregado al grupo:', { grupoId, matricula });
            res.status(201).json(Respuesta.exito({ grupoId, matricula }, 'Coche agregado al grupo'));
        });
    }

    removeCocheFromGrupo(req, res) {
        const { grupoId } = req.params;
        const { matricula } = req.body;

        if (!matricula) {
            logMensaje('Matricula es requerido');
            return res.status(400).json(Respuesta.error(null, 'matricula es requerido'));
        }

        logMensaje(`Eliminando coche con matricula ${matricula} del grupo ${grupoId}`);
        GrupoCocheModel.removeCocheFromGrupo(grupoId, matricula, (err, result) => {
            if (err) {
                logMensaje('Error al eliminar el coche del grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el coche del grupo'));
            }
            logMensaje('Coche eliminado del grupo:', { grupoId, matricula });
            res.status(204).end();
        });
    }

    getCochesByGroup(req, res) {
        const { grupoId } = req.params;
        logMensaje(`Obteniendo coches para el grupo con ID: ${grupoId}`);

        GrupoCocheModel.getCochesByGroup(grupoId, (err, coches) => {
            if (err) {
                logMensaje('Error al recuperar los coches del grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los coches del grupo'));
            } else if (!coches || coches.length === 0) {
                logMensaje('No se encontraron coches para el grupo especificado');
                return res.status(404).json(Respuesta.error(null, 'No se encontraron coches para el grupo especificado'));
            } else {
                logMensaje('Coches del grupo recuperados:', coches);
                return res.json(Respuesta.exito(coches, 'Listado de coches del grupo recuperado'));
            }
        });
    }
}

module.exports = new GrupoCocheController();
