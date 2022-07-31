// const ofertas= require('../models/data/products/ofertas.json'); 
const db = require('../database/models');

const indexController={
  //Muestra index con las ofertas del día.
  index: function(req, res) {
    db.Car.findAll({include:['brand','category','color','condition','currency','fuel','status','transmission'],raw:true,nest:true})
      .then(ofertas => {
        res.render('index', {'ofertas':ofertas});
      });
  },
}

module.exports = indexController;