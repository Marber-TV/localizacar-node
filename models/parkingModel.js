const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class ParkingModel {
    getAllParkings(callback) {
        const query = 'SELECT * FROM parking';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    createParking(parkingData, callback) {
        const query = 'INSERT INTO parking (latitude, longitude, usermail, matricula) VALUES ($1, $2, $3, $4)';
        const values = [parkingData.latitude, parkingData.longitude, parkingData.usermail, parkingData.matricula];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getParkingById(parkingId, callback) {
        const query = 'SELECT * FROM parking WHERE id = $1';
        db.query(query, [parkingId], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    deleteParkingById(parkingId, callback) {
        const query = 'DELETE FROM parking WHERE id = $1';
        db.query(query, [parkingId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getLastParkingByEmail(userEmail, callback) {
        const query = 'SELECT * FROM parking WHERE usermail = $1 ORDER BY id DESC LIMIT 1';
        db.query(query, [userEmail], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }
}

module.exports = new ParkingModel();
