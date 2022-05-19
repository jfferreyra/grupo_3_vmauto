const carritos= require('../bd/carritos/carritos.json'); 
const ofertasSugeridas= require('../bd/autos/ofertasSugeridas.json'); 
const autos=require('../bd/autos/autos.json');

const carritoController={
  'carrito': function(req, res) {
    const id=+req.params.id;
    const idsAutosCarrito=carritos.find(carrito=>carrito.id===id).carrito;
    const carrito=idsAutosCarrito.map(id=>autos.find(auto=>auto.id===id));
    res.render('carrito', {'carrito':carrito,'ofertasSugeridas':ofertasSugeridas});
  },
}

module.exports = carritoController;