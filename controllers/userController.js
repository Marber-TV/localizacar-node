const UserModel = require('../models/userModel');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class userController {
  getAllUsers(req, res) {
    UserModel.getAllUsers((err, data) => {
      if (err) {
        res.status(500).json(Respuesta.error(null, 'Error al recuperar los datos:' + req.originalUrl));
      } else {
        res.json(Respuesta.exito(data, 'Listado de usuarios recuperado'));
      }
    });
  }

  createUser(req, res) {
    const userData = req.body;

    UserModel.createUser(userData, (err, result) => {
      if (err) {
        res.status(500).json(Respuesta.error(null, 'Error al crear el usuario:' + req.originalUrl));
      } else {
        res.status(201).json(Respuesta.exito({ usermail: userData.usermail }, 'Usuario creado exitosamente'));
      }
    });
  }


  signIn(req, res) {
    const { usermail, userpassword } = req.body;

    UserModel.getUserByEmail(usermail, (err, user) => {
      if (err) {
        res.status(500).json({ message: "Error en el servidor" });
      } else if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        if (userpassword === user.userpassword) {
          res.json({ message: "Inicio de sesión exitoso" });
        } else {
          res.status(401).json({ message: "Contraseña incorrecta" });
        }
      }
    });
  }

  getUserByEmail(req, res) {
    const usermail = req.params.email;
    UserModel.getUserByEmail(usermail, (err, user) => {
      if (err) {
        res.status(500).json({ message: "Error al buscar el email" });
      } else if (user) {
        res.json({ user: true });
      } else {
        res.json({ user: false });
      }
    });
  }

  checkEmailExistence(req, res) {
    const email = req.params.email;
    UserModel.getUserByEmail(email, (err, user) => {
      if (err) {
        res.status(500).send("Error al verificar el correo electrónico");
      } else {
        res.json({ exists: !!user });
      }
    });
  }
  
  deleteUser(req, res) {
    const usermail = req.params.email;

    UserModel.deleteUserByEmail(usermail, (err, result) => {
      if (err) {
        res.status(500).json(Respuesta.error(null, 'Error al eliminar el usuario:' + req.originalUrl));
      } else if (result.affectedRows === 0) {
        res.status(404).json(Respuesta.error(null, 'Usuario no encontrado: ' + usermail));
      } else {
        res.status(204).end();
      }
    });
  }
  
  
}

module.exports = new userController();
