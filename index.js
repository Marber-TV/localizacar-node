// Importar librerías
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createGlobalProxyAgent } = require('global-agent');

// Configurar el proxy global utilizando la URL de Fixie
const fixieUrl = process.env.FIXIE_URL;
if (fixieUrl) {
  process.env.GLOBAL_AGENT_HTTP_PROXY = fixieUrl;
  process.env.GLOBAL_AGENT_HTTPS_PROXY = fixieUrl;
  createGlobalProxyAgent();
}

// Importar gestores de rutas
const userRoutes = require('./routes/userRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const cocheRoutes = require('./routes/cocheRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const userCarRoutes = require('./routes/carUserRoutes');
const grupoUsuarioRoutes = require('./routes/grupoUsuarioRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());

// Configurar rutas de la API Rest
app.use('/api/user', userRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/coches', cocheRoutes);
app.use('/api/grupos', grupoRoutes);
app.use('/api', userCarRoutes);
app.use('/api/grupo-usuarios', grupoUsuarioRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar las solicitudes al archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

const { Pool } = require('pg');

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
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
