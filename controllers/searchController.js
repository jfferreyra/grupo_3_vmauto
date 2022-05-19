const search= require('../bd/autos/search.json'); 

const searchController={
  'search': function(req, res) {
    res.render('search', {'search':search});
  },
}

module.exports = searchController;