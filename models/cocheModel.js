const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class CocheModel {
    static create(matricula, marca, color, callback) {
        const query = 'INSERT INTO coche (matricula, marca, color) VALUES ($1, $2, $3)';
        db.query(query, [matricula, marca, color], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static findByMatricula(matricula, callback) {
        const query = 'SELECT * FROM coche WHERE matricula = $1';
        db.query(query, [matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static update(matricula, marca, color, callback) {
        const query = 'UPDATE coche SET marca = $1, color = $2 WHERE matricula = $3';
        db.query(query, [marca, color, matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static delete(matricula, callback) {
        const query = 'DELETE FROM coche WHERE matricula = $1';
        db.query(query, [matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = CocheModel;
