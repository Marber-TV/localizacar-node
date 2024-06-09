const { Pool } = require('pg');
const HttpsProxyAgent = require('https-proxy-agent');
const url = require('url');

// Obtener la URL del proxy de Fixie desde la variable de entorno
const proxyUrl = process.env.FIXIE_URL;

if (!proxyUrl) {
    throw new Error('FIXIE_URL no está definida');
}

const agent = new HttpsProxyAgent(proxyUrl);

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    // Añadir el proxy a la configuración de la base de datos
    connection: {
        agent: agent
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
