const ofertas= require('../models/data/products/ofertas.json'); 

const indexController={
  //Muestra index con las ofertas del día.
  index: function(req, res) {
    res.render('index', {'ofertas':ofertas});
  },
}

module.exports = indexController;