const express = require('express');
const router = express.Router();

//Importación de Controlador Index
  const indexController=require('../controllers/indexController')

//Index e Index post de recepcion de login y register temporario solo demostracion.
  router.get('/', indexController.index);
  router.post('/', indexController.index);

module.exports = router;