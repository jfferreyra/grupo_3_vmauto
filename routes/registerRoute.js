const express = require('express');
const router = express.Router();

//Importación de Controlador Register
const registerController=require('../controllers/registerController')

//Muestra Formulario de Login
  router.get('/', registerController.register);

module.exports = router;