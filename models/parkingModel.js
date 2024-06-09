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
                callback(null, result);
            }
        });
    }

    createParking(parkingData, callback) {
        const query = 'INSERT INTO parking (latitude, longitude, usermail, matricula) VALUES (?, ?, ?, ?)';
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
        const query = 'SELECT * FROM parking WHERE id = ?';
        db.query(query, [parkingId], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    deleteParkingById(parkingId, callback) {
        const query = 'DELETE FROM parking WHERE id = ?';
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
        const query = 'SELECT * FROM parking WHERE usermail = ? ORDER BY id DESC LIMIT 1';
        db.query(query, [userEmail], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }
}

module.exports = new ParkingModel();
