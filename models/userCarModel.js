const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class UserCarModel {
    static addUserCar(usermail, matricula, callback) {
        const query = 'INSERT INTO usuariocoches (usermail, matricula) VALUES (?, ?)';
        db.query(query, [usermail, matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static findUserCars(usermail, callback) {
        const query = 'SELECT c.* FROM coche c INNER JOIN usuariocoches uc ON c.matricula = uc.matricula WHERE uc.usermail = ?';
        db.query(query, [usermail], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static deleteUserCar(usermail, matricula, callback) {
        const query = 'DELETE FROM usuariocoches WHERE usermail = ? AND matricula = ?';
        db.query(query, [usermail, matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = UserCarModel;
