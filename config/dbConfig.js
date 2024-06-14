const { Pool } = require('pg');

const dbConfig = {
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool(dbConfig);

pool.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = pool;
