const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class UserCarModel {
    static addUserCar(usermail, matricula, callback) {
        const query = 'INSERT INTO usuariocoches (usermail, matricula) VALUES ($1, $2)';
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
        const query = `
            SELECT c.* 
            FROM coche c 
            INNER JOIN usuariocoches uc 
            ON c.matricula = uc.matricula 
            WHERE uc.usermail = $1
        `;
        db.query(query, [usermail], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static deleteUserCar(usermail, matricula, callback) {
        const query = 'DELETE FROM usuariocoches WHERE usermail = $1 AND matricula = $2';
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
