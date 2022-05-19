const autos= require('../bd/autos/autos.json'); 

const productController={
  'product': function(req, res) {
    const id=+req.params.id;
    const auto=autos.find(auto=>auto.id===id);
    res.render('products/product', {'auto':auto});
  },
}

module.exports = productController;