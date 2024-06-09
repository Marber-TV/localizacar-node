const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class GrupoCocheModel {
    addCocheToGrupo(grupoId, matricula, callback) {
        const query = 'INSERT INTO grupocoches (grupo_id, matricula) VALUES (?, ?)';
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
        const query = 'DELETE FROM grupocoches WHERE grupo_id = ? AND matricula = ?';
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
        const query = 'SELECT * FROM coche WHERE matricula IN (SELECT matricula FROM grupocoches WHERE grupo_id = ?)';
        db.query(query, [grupoId], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    
}

module.exports = new GrupoCocheModel();
