const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para verificar la existencia de un correo electrónico
router.get('/email/:email', userController.checkEmailExistence);

// Ruta para iniciar sesión
router.post('/login', userController.signIn);


// Ruta para eliminar un usuario por su correo electrónico
router.delete('/:email', userController.deleteUser);

module.exports = router;
