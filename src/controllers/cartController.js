// ****************************** USUARIO - CONTROLLER *************************************************
//***************** Importación *******************************
  //Base de datos
  const db = require('../database/models'); //Modelos y relaciones
//************************************** Controller **************************************************
const cartController={
  cart: function(req, res) {
    let id=+req.session.user.id; //Obtiene id de req.session de usuario logueado.
    let cart=db.Cart.findAll({
      where: { user_id: id }, //Busca todos los cars que compro el usuario en la tabla pivot
      include:[   //Incluye el objeto car con sus propiedades
        {association:'car',
          include:[   //A su vez car incluye las propiedades de sus propiedades que estan en tablas foraneas.
            {association:'brand'},
            {association:'condition'},
            {association:'fuel'},
            {association:'transmission'},
            {association:'color'},
            {association:'category'},
            {association:'currency'}
          ]
        }
      ]
    });
    let hotcars=db.Car.findAll({  //Busca de todos los autos los que estan en promoción.
      where: { status_id: 3 },
      include:[   //Incluye las propiedades de las propiedades que estan en tablas foraneas.
        {association:'brand'},
        {association:'condition'},
        {association:'fuel'},
        {association:'transmission'},
        {association:'color'},
        {association:'category'},
        {association:'currency'}
      ]
    });   
  Promise.all([cart,hotcars]) // Recibe las dos promesas y envia a vista carrito
  .then( ([cart,hotcars])=> {
        res.render('carrito', {cart,hotcars}); // Muestra carrito y promociones
      });
  },
  addCar:function (req,res) {
    let user_id=+req.session.user.id; // Obtiene id del usuario de session
    let car_id=+req.body.carId; // Obtiene id del coche a agregar del body
    db.Cart.findOrCreate({  // Busca el carrito y busca el auto si existe
      where: { user_id,car_id }, // En caso de que ya exista no lo agrega
      defaults: { user_id,car_id } // Si no existe entonces crea el registro y agrega el coche
    })
      .then( ([cart,created])=> {
        return res.redirect(`/carrito/${user_id}`); // Muestra carrito
      });
  },
  delCar:function (req,res) {
    let user_id=+req.session.user.id; // Obtiene id del usuario de session
    let car_id=+req.body.carId; // Obtiene id del coche a borrar
    db.Cart.destroy({   // Borra si existe el registro de usuario-coche
      where:{
        user_id,
        car_id
      }
    })
      .then( result=> {
        return res.redirect(`/carrito/${user_id}`); // Redirije al carrito
      });
  }
}

module.exports = cartController;