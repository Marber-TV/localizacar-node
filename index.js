// Importar librería express --> web server
const express = require('express');
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require('path');
// Importar libreria CORS
const cors = require('cors');
// Importar gestores de rutas
const userRoutes = require('./routes/userRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const cocheRoutes = require('./routes/cocheRoutes');
const grupoRoutes = require('./routes/grupoRoutes'); // Importa las rutas de grupos
const userCarRoutes = require('./routes/carUserRoutes'); // Importa las rutas de userCar
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
