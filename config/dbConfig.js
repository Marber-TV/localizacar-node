const { Pool } = require('pg');

const dbConfig = {
    connectionString: 'postgres://u806htc6eqbi4v:pbbd75b1deec5a78024760fa69171d3cf59ca21903040bf5b9af9bce48c30e44e@cav8p52l9arddb.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/d7vd377320nl6h',
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
