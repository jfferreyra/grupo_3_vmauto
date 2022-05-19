const listas= require('../bd/autos/listas.json'); 
const autos=require('../bd/autos/autos.json');

const adminProductsController={
  'adminProducts': function(req, res) {
    const id=+req.params.id;
    const idsAutosLista=listas.find(lista=>lista.id===id).lista;
    const lista=idsAutosLista.map(id=>autos.find(auto=>auto.id===id));
    res.render('products/adminProducts', {'lista':lista});
  },
  'addProduct': function(req, res) {
    const id=+req.params.id;
    const auto=autos.find(auto=>auto.id===id);
    res.render('products/addProduct', {'auto':auto});
  }
}

module.exports = adminProductsController;