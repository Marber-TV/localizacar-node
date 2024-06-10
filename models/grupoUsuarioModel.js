const db = require('../config/dbConfig');
const { logMensaje } = require('../utils/logger');

class GrupoUsuarioModel {
    static isUsuarioInGrupo(grupoId, usermail, callback) {
        const query = `
            SELECT COUNT(*) AS count
            FROM grupousuarios
            WHERE grupo_id = $1 AND usermail = $2
        `;
        db.query(query, [grupoId, usermail], (err, results) => {
            if (err) {
                logMensaje('Error en isUsuarioInGrupo:', err);
                return callback(err, null);
            }
            const isInGroup = results.rows[0].count > 0;
            callback(null, isInGroup);
        });
    }

    static addUsuarioToGrupo(grupoId, usermail, callback) {
        const query = `
            INSERT INTO grupousuarios (grupo_id, usermail)
            VALUES ($1, $2)
        `;
        db.query(query, [grupoId, usermail], (err, results) => {
            if (err) {
                logMensaje('Error en addUsuarioToGrupo:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static removeUsuarioFromGrupo(grupoId, usermail, callback) {
        const query = `
            DELETE FROM grupousuarios
            WHERE grupo_id = $1 AND usermail = $2
        `;
        db.query(query, [grupoId, usermail], (err, results) => {
            if (err) {
                logMensaje('Error en removeUsuarioFromGrupo:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getGruposByUser(usermail, callback) {
        const query = `
            SELECT g.*
            FROM grupos g
            JOIN grupousuarios gu ON g.id = gu.grupo_id
            WHERE gu.usermail = $1
        `;
        db.query(query, [usermail], (err, results) => {
            if (err) {
                logMensaje('Error en getGruposByUser:', err);
                return callback(err, null);
            }
            callback(null, results.rows);
        });
    }
}

module.exports = GrupoUsuarioModel;
