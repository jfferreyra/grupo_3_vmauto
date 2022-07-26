const express = require('express');
const router = express.Router();

//Importación de Controlador Index
  const indexController=require('../controllers/indexController')

//Vista Index de promociones.
  router.get('/', indexController.index);

module.exports = router;