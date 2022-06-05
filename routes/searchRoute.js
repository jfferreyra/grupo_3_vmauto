const express = require('express');
const router = express.Router();

//Importación de Controlador de Buscador
  const searchController=require('../controllers/searchController');

//Muestra Buscador recibe por post resultado de consulta temporario y simulado.
  router.get('/', searchController.search);
  router.post('/', searchController.search);

module.exports = router;