const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class GrupoCocheModel {
    addCocheToGrupo(grupoId, matricula, callback) {
        const query = 'INSERT INTO grupocoches (grupo_id, matricula) VALUES ($1, $2)';
        db.query(query, [grupoId, matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    removeCocheFromGrupo(grupoId, matricula, callback) {
        const query = 'DELETE FROM grupocoches WHERE grupo_id = $1 AND matricula = $2';
        db.query(query, [grupoId, matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getCochesByGroup(grupoId, callback) {
        const query = 'SELECT * FROM coche WHERE matricula IN (SELECT matricula FROM grupocoches WHERE grupo_id = $1)';
        db.query(query, [grupoId], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results.rows);
            }
        });
    }
}

module.exports = new GrupoCocheModel();
