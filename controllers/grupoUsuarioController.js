const GrupoUsuarioModel = require('../models/grupoUsuarioModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class GrupoUsuarioController {
    getGruposByUser(req, res) {
        const usermail = req.query.usermail;
        logMensaje('Parámetro usermail:', usermail);

        if (!usermail) {
            logMensaje('usermail es requerido');
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        logMensaje('Llamando a GrupoUsuarioModel.getGruposByUser con usermail:', usermail);
        GrupoUsuarioModel.getGruposByUser(usermail, (err, grupos) => {
            logMensaje('Dentro del callback de getGruposByUser');
            if (err) {
                logMensaje('Error al recuperar los grupos:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los grupos'));
            }
            logMensaje('Grupos recuperados:', grupos);
            res.json(Respuesta.exito(grupos, 'Listado de grupos recuperado'));
        });
    }

    addUsuarioToGrupo(req, res) {
        const grupoId = req.params.grupoId;
        const { usermail } = req.body;
        logMensaje('Parámetros:', { grupoId, usermail });

        if (!usermail) {
            logMensaje('usermail es requerido');
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        logMensaje(`Verificando si el usuario ${usermail} ya está en el grupo ${grupoId}`);
        GrupoUsuarioModel.isUsuarioInGrupo(grupoId, usermail, (err, isInGroup) => {
            if (err) {
                logMensaje('Error al verificar la membresía del usuario en el grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al verificar la membresía del usuario en el grupo'));
            }

            if (isInGroup) {
                logMensaje('El usuario ya es miembro del grupo');
                return res.status(400).json(Respuesta.error(null, 'El usuario ya es miembro del grupo'));
            }

            logMensaje(`Agregando usuario ${usermail} al grupo ${grupoId}`);
            GrupoUsuarioModel.addUsuarioToGrupo(grupoId, usermail, (err, result) => {
                if (err) {
                    logMensaje('Error al agregar el usuario al grupo:', err);
                    return res.status(500).json(Respuesta.error(null, 'Error al agregar el usuario al grupo'));
                }
                logMensaje('Usuario agregado al grupo exitosamente');
                res.status(201).json(Respuesta.exito(result, 'Usuario agregado al grupo exitosamente'));
            });
        });
    }

    removeUsuarioFromGrupo(req, res) {
        const grupoId = req.params.grupoId;
        const { usermail } = req.body;
        logMensaje('Parámetros:', { grupoId, usermail });

        if (!usermail) {
            logMensaje('usermail es requerido');
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        logMensaje(`Eliminando usuario ${usermail} del grupo ${grupoId}`);
        GrupoUsuarioModel.removeUsuarioFromGrupo(grupoId, usermail, (err, result) => {
            if (err) {
                logMensaje('Error al eliminar el usuario del grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el usuario del grupo'));
            }
            logMensaje('Usuario eliminado del grupo exitosamente');
            res.status(204).end();
        });
    }
}

module.exports = new GrupoUsuarioController();
