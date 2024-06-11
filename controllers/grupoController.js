const GrupoModel = require('../models/grupoModel');
const GrupoUsuarioModel = require('../models/grupoUsuarioModel');
const GrupoCocheModel = require('../models/grupoCocheModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class GrupoController {
    getGroupCoches(req, res) {
        const { usermail } = req.query;
        logMensaje(`Recuperando coches de grupos para el usuario: ${usermail}`);
        GrupoModel.getGroupCochesByUser(usermail, (err, coches) => {
            if (err) {
                logMensaje('Error al recuperar los coches de los grupos:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los coches de los grupos'));
            }
            logMensaje('Coches de grupos recuperados:', coches);
            res.json(Respuesta.exito(coches, 'Listado de coches de los grupos recuperado'));
        });
    }

    getGruposByUser(req, res) {
        const usermail = req.query.usermail;

        if (!usermail) {
            logMensaje('usermail es requerido');
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        logMensaje(`Recuperando grupos para el usuario: ${usermail}`);
        GrupoModel.getGruposByUser(usermail, (err, grupos) => {
            if (err) {
                logMensaje('Error al recuperar los grupos:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los grupos'));
            }
            logMensaje('Grupos recuperados:', grupos);
            res.json(Respuesta.exito(grupos, 'Listado de grupos recuperado'));
        });
    }

    createGrupo(req, res) {
        const { nombre, descripcion, usermail, coche } = req.body;

        if (!nombre || !usermail) {
            logMensaje('Nombre del grupo y usermail son requeridos');
            return res.status(400).json(Respuesta.error(null, 'Nombre del grupo y usermail son requeridos'));
        }

        logMensaje(`Creando grupo con nombre: ${nombre}, descripcion: ${descripcion}`);
        GrupoModel.createGrupo({ nombre, descripcion }, (err, result) => {
            if (err) {
                logMensaje('Error al crear el grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al crear el grupo'));
            }

            const grupoId = result.insertId;
            logMensaje(`Grupo creado con ID: ${grupoId}, agregando usuario: ${usermail}`);
            GrupoUsuarioModel.addUsuarioToGrupo(grupoId, usermail, (err) => {
                if (err) {
                    logMensaje('Error al agregar el usuario al grupo:', err);
                    return res.status(500).json(Respuesta.error(null, 'Error al agregar el usuario al grupo'));
                }

                logMensaje(`Agregando coche con matricula: ${coche} al grupo con ID: ${grupoId}`);
                GrupoModel.addCocheToGrupo(grupoId, coche, (err) => {
                    if (err) {
                        logMensaje('Error al agregar el coche al grupo:', err);
                        return res.status(500).json(Respuesta.error(null, 'Error al agregar el coche al grupo'));
                    }
                    logMensaje('Grupo creado y usuario añadido con éxito');
                    res.status(201).json(Respuesta.exito({ id: grupoId, nombre, descripcion, coche }, 'Grupo creado y usuario añadido'));
                });
            });
        });
    }

    getGrupoById(req, res) {
        const grupoId = req.params.id;
        logMensaje(`Recuperando grupo con ID: ${grupoId}`);
        GrupoModel.getGrupoById(grupoId, (err, grupo) => {
            if (err) {
                logMensaje('Error al recuperar el grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar el grupo'));
            } else if (!grupo) {
                logMensaje('Grupo no encontrado:', grupoId);
                return res.status(404).json(Respuesta.error(null, 'Grupo no encontrado'));
            }
            logMensaje('Grupo recuperado:', grupo);
            res.json(Respuesta.exito(grupo, 'Grupo recuperado'));
        });
    }

    deleteGrupoById(req, res) {
        const grupoId = req.params.id;
        logMensaje(`Eliminando grupo con ID: ${grupoId}`);

        GrupoModel.deleteGrupoById(grupoId, (err, result) => {
            if (err) {
                logMensaje('Error al eliminar el grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el grupo'));
            }

            if (result.affectedRows === 0) {
                logMensaje('Grupo no encontrado para eliminar:', grupoId);
                return res.status(404).json(Respuesta.error(null, 'Grupo no encontrado'));
            }

            logMensaje('Grupo eliminado con éxito:', grupoId);
            return res.status(204).end();
        });
    }

    removeUsuarioFromGrupo(req, res) {
        const { grupoId } = req.params;
        const { usermail } = req.body;

        if (!usermail) {
            logMensaje('usermail es requerido');
            return res.status(400).json(Respuesta.error(null, 'usermail es requerido'));
        }

        logMensaje(`Eliminando usuario: ${usermail} del grupo con ID: ${grupoId}`);
        GrupoUsuarioModel.removeUsuarioFromGrupo(grupoId, usermail, (err, result) => {
            if (err) {
                logMensaje('Error al eliminar el usuario del grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al eliminar el usuario del grupo'));
            }
            logMensaje('Usuario eliminado del grupo:', usermail);
            res.status(204).end();
        });
    }

    getCochesByGroup(req, res) {
        const { grupoId } = req.params;
        logMensaje(`Recuperando coches del grupo con ID: ${grupoId}`);
        GrupoCocheModel.getCochesByGroup(grupoId, (err, coches) => {
            if (err) {
                logMensaje('Error al recuperar los coches del grupo:', err);
                return res.status(500).json(Respuesta.error(null, 'Error al recuperar los coches del grupo'));
            } else if (!coches || coches.length === 0) {
                logMensaje('No se encontraron coches para el grupo especificado');
                return res.status(404).json(Respuesta.error(null, 'No se encontraron coches para el grupo especificado'));
            }
            logMensaje('Coches del grupo recuperados:', coches);
            res.json(Respuesta.exito(coches, 'Listado de coches del grupo recuperado'));
        });
    }
}

module.exports = new GrupoController();
