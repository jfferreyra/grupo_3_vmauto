// const search= require('../models/data/products/search.json'); 

const searchController={
  //Muestra resultados de busqueda realizada por usuario
  'search': function(req, res) {
    res.render('search', {'search':search});
  },
}

module.exports = searchController;