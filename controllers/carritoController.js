const carritos= require('../models/data/products/carritos.json'); 
const ofertasSugeridas= require('../models/data/products/ofertasSugeridas.json'); 
const autos=require('../models/data/products/carsDB.json');

const carritoController={
  carrito: function(req, res) {
    const id=+req.params.id;
    //Busca en el array carritos el idcarrito del carrito(conjunto de ids de productos) correspondiente.
    const carritoIds=carritos.find(carrito=>carrito.id===id).carrito;
    //Construye un array con los productos con ids correspondientes a los del carritoIds. 
    const carrito=carritoIds.map(id=>autos.find(auto=>auto.id===id));
    //Renderiza el carrito y las ofertas sugeridas.
    res.render('carrito', {'carrito':carrito,'ofertasSugeridas':ofertasSugeridas});
  },
}

module.exports = carritoController;