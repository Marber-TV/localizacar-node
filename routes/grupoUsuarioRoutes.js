const express = require('express');
const router = express.Router();
const grupoUsuarioController = require('../controllers/grupoUsuarioController');

router.get('/', grupoUsuarioController.getGruposByUser);


module.exports = router;
