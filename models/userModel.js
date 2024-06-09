const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');
const UserCarModel = require('./userCarModel'); // Importar el modelo intermedio

class UserModel {
    getAllUsers(callback) {
        const query = 'SELECT * FROM user';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    createUser(userData, callback) {
        const query = 'INSERT INTO user (usermail, userpassword) VALUES (?, ?)';
        const values = [userData.usermail, userData.userpassword];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    
    getUserByEmail(userEmail, callback) {
        const query = 'SELECT * FROM user WHERE usermail = ? LIMIT 1';
        db.query(query, [userEmail], (err, results) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    deleteUserByEmail(userEmail, callback) {
        const query = 'DELETE FROM user WHERE usermail = ?';
        db.query(query, [userEmail], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Método para agregar un coche a un usuario
    addUserCar(usermail, matricula, callback) {
        UserCarModel.addUserCar(usermail, matricula, callback);
    }

    // Método para obtener los coches de un usuario
    getUserCars(usermail, callback) {
        UserCarModel.findUserCars(usermail, callback);
    }

    // Método para eliminar un coche de un usuario
    deleteUserCar(usermail, matricula, callback) {
        UserCarModel.deleteUserCar(usermail, matricula, callback);
    }
}

module.exports = new UserModel();
