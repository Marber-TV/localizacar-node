const { Pool } = require('pg');
const { HttpsProxyAgent } = require('https-proxy-agent');
const url = require('url');

// Obtener la URL del proxy de QuotaGuard Static desde la variable de entorno
const proxyUrl = process.env.QUOTAGUARDSTATIC_URL;

// Configurar el agente del proxy
const proxy = url.parse(proxyUrl);
const agent = new HttpsProxyAgent(proxy);

const dbConfig = {
    connectionString: process.env.DATABASE_URL || 'postgres://u806htc6eqbi4v:pbbd75b1deec5a78024760fa69171d3cf59ca21903040bf5b9af9bce48c30e44e@cav8p52l9arddb.cluster-czz5a0kz4scl.eu-west-1.rds.amazonaws.com:5432/d7vd377320nl6h',
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
