const MensajeModel = require('../models/mensajeModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class MensajeController {
    getAllMensajesByGrupo(req, res) {
        const grupoId = req.params.grupoId;

        MensajeModel.getMensajesByGrupoId(grupoId, (err, mensajes) => {
            if (err) {
                logMensaje('Error al recuperar los mensajes del grupo:', err);
                res.status(500).json(Respuesta.error(null, 'Error al recuperar los mensajes del grupo:' + req.originalUrl));
            } else {
                res.json(Respuesta.exito(mensajes, 'Listado de mensajes recuperado'));
            }
        });
    }

    createMensaje(req, res) {
        const mensajeData = {
            contenido: req.body.contenido,
            grupoId: req.params.grupoId,
            usermail: req.body.usermail
        };

        MensajeModel.createMensaje(mensajeData, (err, result) => {
            if (err) {
                logMensaje('Error al crear el mensaje:', err);
                res.status(500).json(Respuesta.error(null, 'Error al crear el mensaje:' + req.originalUrl));
            } else {
                res.status(201).json(Respuesta.exito(result, 'Mensaje creado exitosamente'));
            }
        });
    }
}

module.exports = new MensajeController();
