const GrupoModel = require('../models/grupoModel');
const GrupoUsuarioModel = require('../models/grupoUsuarioModel');
const GrupoCocheModel = require('../models/grupoCocheModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class GrupoController {
    getGroupCoches(req, res) {
        const { usermail } = req.query;
        GrupoModel.getGroupCochesByUser(usermail, (err, coches) => {
            if (err) {
                res.status(500).json(Respuesta.error(null, 'Error al recuperar los coches de los grupos'));
            } else {
                res.json(Respuesta.exito(coches, 'Listado de coches de los grupos recuperado'));
            }
        });
    }

    getGruposByUser(req, res) {
        const usermail = req.query.usermail;

        if (!usermail) {
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        GrupoModel.getGruposByUser(usermail, (err, grupos) => {
            if (err) {
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los grupos'));
            }
            res.json(Respuesta.exito(grupos, 'Listado de grupos recuperado'));
        });
    }

    createGrupo(req, res) {
        const { nombre, descripcion, usermail, coche } = req.body;

        if (!nombre || !usermail) {
            return res.status(400).json(Respuesta.error(null, 'Nombre del grupo y usermail son requeridos'));
        }

        GrupoModel.createGrupo({ nombre, descripcion }, (err, result) => {
            if (err) {
                return res.status(500).json(Respuesta.error(null, 'Error al crear el grupo'));
            }

            const grupoId = result.insertId;
            GrupoUsuarioModel.addUsuarioToGrupo(grupoId, usermail, (err) => {
                if (err) {
                    return res.status(500).json(Respuesta.error(null, 'Error al agregar el usuario al grupo'));
                }

                GrupoModel.addCocheToGrupo(grupoId, coche, (err) => {
                    if (err) {
                        return res.status(500).json(Respuesta.error(null, 'Error al agregar el coche al grupo'));
                    }
                    res.status(201).json(Respuesta.exito({ id: grupoId, nombre, descripcion, coche }, 'Grupo creado y usuario añadido'));
                });
            });
        });
    }

    getGrupoById(req, res) {
        const grupoId = req.params.id;
        GrupoModel.getGrupoById(grupoId, (err, grupo) => {
            if (err) {
                res.status(500).json(Respuesta.error(null, 'Error al recuperar el grupo:' + req.originalUrl));
            } else if (!grupo) {
                res.status(404).json(Respuesta.error(null, 'Grupo no encontrado'));
            } else {
                res.json(Respuesta.exito(grupo, 'Grupo recuperado'));
            }
        });
    }

    deleteGrupoById(req, res) {
        const grupoId = req.params.id;

        GrupoModel.deleteGrupoById(grupoId, (err, result) => {
            if (err) {
                logMensaje('Error al eliminar el grupo con ID: ' + grupoId, err);
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el grupo:' + req.originalUrl));
            }

            if (result.affectedRows === 0) {
                logMensaje('Intento de eliminación de un grupo no encontrado con ID: ' + grupoId);
                return res.status(404).json(Respuesta.error(null, 'Grupo no encontrado: ' + grupoId));
            }

            logMensaje('Grupo eliminado con éxito con ID: ' + grupoId);
            return res.status(204).end();
        });
    }

    removeUsuarioFromGrupo(req, res) {
        const { grupoId } = req.params;
        const { usermail } = req.body;

        if (!usermail) {
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        GrupoUsuarioModel.removeUsuarioFromGrupo(grupoId, usermail, (err, result) => {
            if (err) {
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el usuario del grupo'));
            }
            res.status(204).end();
        });
    }
    getCochesByGroup(req, res) {
        const { grupoId } = req.params;
        GrupoCocheModel.getCochesByGroup(grupoId, (err, coches) => {
            if (err) {
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los coches del grupo'));
            } else if (!coches || coches.length === 0) {
                return res.status(404).json(Respuesta.error(null, 'No se encontraron coches para el grupo especificado'));
            } else {
                return res.json(Respuesta.exito(coches, 'Listado de coches del grupo recuperado'));
            }
        });
    }

}

module.exports = new GrupoController();
