const express = require('express');
const router = express.Router();

//Importación Controlador Login
  const loginController=require('../controllers/loginController')

//Muestra Formulario de Login
  router.get('/', loginController.login);

module.exports = router;