const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class CocheModel {
    static create(matricula, marca, color, callback) {
        const query = "INSERT INTO coche (matricula, marca, color) VALUES (?, ?, ?)";
        db.query(query, [matricula, marca, color], callback);
    }

    static findByMatricula(matricula, callback) {
        const query = "SELECT * FROM coche WHERE matricula = ?";
        db.query(query, [matricula], callback);
    }

    static update(matricula, marca, color, callback) {
        const query = "UPDATE coche SET marca = ?, color = ? WHERE matricula = ?";
        db.query(query, [marca, color, matricula], callback);
    }

    static delete(matricula, callback) {
        const query = "DELETE FROM coche WHERE matricula = ?";
        db.query(query, [matricula], callback);
    }
}

module.exports = CocheModel;
