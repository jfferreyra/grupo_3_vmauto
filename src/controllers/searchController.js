// const search= require('../models/data/products/search.json');
const db = require('../database/models');

const searchController = {
  
  //Muestra resultados de busqueda realizada por usuario
  
  search: function (req, res) {
    let marca = req.body.search;
    db.Car.findAll({
      include: [
        'brand',
        'category',
        'color',
        'condition',
        'currency',
        'fuel',
        'status',
        { association: 'transmission',where:{name:marca} },
      ],
      raw: true,
      nest: true,
    }).then((search) => {
      res.render('search', { search: search });
    });
  },
};

module.exports = searchController;
