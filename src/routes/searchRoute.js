const express = require('express');
const router = express.Router();

//Importación de Controlador de Buscador
  const searchController=require('../controllers/searchController');
  const userMware=require('../middlewares/user/userMware'); //Middlewares de auth y guest, autorizado e invitado


//Muestra Buscador recibe por post resultado de consulta temporario y simulado.
  //Prueba de auth. Sólo puede verlo el auth
  router.post('/',userMware.auth,searchController.search);
  // router.post('/', searchController.search);

module.exports = router;