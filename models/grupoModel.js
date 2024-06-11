const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class GrupoModel {
    getAllGrupos(callback) {
        const query = 'SELECT * FROM grupos';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in getAllGrupos:', err);
                callback(err, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    getGruposByUser(usermail, callback) {
        const query = `
            SELECT g.*
            FROM grupos g
            JOIN grupousuarios gu ON g.id = gu.grupo_id
            WHERE gu.usermail = $1
        `;
        db.query(query, [usermail], (err, results) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in getGruposByUser:', err);
                callback(err, null);
            } else {
                callback(null, results.rows);
            }
        });
    }

    createGrupo(grupoData, callback) {
        const query = 'INSERT INTO grupos (nombre, descripcion) VALUES ($1, $2)';
        const values = [grupoData.nombre, grupoData.descripcion];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in createGrupo:', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    
    addCocheToGrupo(grupoId, matricula, callback) {
        const query = 'INSERT INTO grupocoches (grupo_id, matricula) VALUES ($1, $2)';
        db.query(query, [grupoId, matricula], (err, result) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in addCocheToGrupo:', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getGrupoById(grupoId, callback) {
        const query = 'SELECT * FROM grupos WHERE id = $1';
        db.query(query, [grupoId], (err, results) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in getGrupoById:', err);
                callback(err, null);
            } else {
                callback(null, results.rows[0]);
            }
        });
    }

    deleteGrupoById(grupoId, callback) {
        const query = 'DELETE FROM grupos WHERE id = $1';
        db.query(query, [grupoId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in deleteGrupoById:', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getGroupCochesByUser(usermail, callback) {
        const query = `
            SELECT c.*
            FROM coche c
            JOIN grupocoches gc ON c.matricula = gc.matricula
            JOIN grupousuarios gu ON gc.grupo_id = gu.grupo_id
            WHERE gu.usermail = $1
        `;
        db.query(query, [usermail], (err, results) => {
            if (err) {
                logErrorSQL(err);
                console.error('Error in getGroupCochesByUser:', err);
                callback(err, null);
            } else {
                callback(null, results.rows);
            }
        });
    }
}

module.exports = new GrupoModel();
