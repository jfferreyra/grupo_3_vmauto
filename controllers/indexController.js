const ofertas= require('../bd/autos/ofertas.json'); 

const indexController={
  'index': function(req, res) {
    res.render('index', {'ofertas':ofertas});
  },
}

module.exports = indexController;