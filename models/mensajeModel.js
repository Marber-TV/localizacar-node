const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class MensajeModel {
    getMensajesByGrupoId(grupoId, callback) {
        const query = 'SELECT * FROM mensajes WHERE grupo_id = $1';
        db.query(query, [grupoId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    createMensaje(mensajeData, callback) {
        const query = 'INSERT INTO mensajes (contenido, grupo_id, usermail) VALUES ($1, $2, $3)';
        const values = [mensajeData.contenido, mensajeData.grupoId, mensajeData.usermail];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, { id: result.rows[0].id, ...mensajeData });
            }
        });
    }
}

module.exports = new MensajeModel();
