const express = require('express');
const router = express.Router();

//Importación Controlador Login
  const registerController = require('../controllers/registerController');

  //const loginController=require('../controllers/registerController')

//Muestra Formulario de Login
  router.get('/', registerController.login);

module.exports = router;