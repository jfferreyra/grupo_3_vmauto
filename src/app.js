//Importación de módulos
  const path=require('path');
  const express=require('express');
  const app=express();
  const session=require('express-session');
  const methodOverride=require('method-override');
  const userMware=require('../src/middlewares/user/userMware');
  const cookies=require('cookie-parser');
  

//Post por formulario.
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(methodOverride('_method'));
  app.use(session({
    secret:'topsecret2040',
    resave:false,
    saveUninitialized: false,
  }));
  app.use(cookies()) //Middleware de aplicacion para mantener usuario luego de cerrar explorador.
  app.use(userMware.logued); //Middleware de aplicacion usuario logueado en sesion.

//Declaracion de variables

  //Puerto
  app.set('port',process.env.PORT||5001);

  //Ejs
  app.set('views', path.resolve('src/views'));
  app.set('view engine','ejs');

// Declaracion y uso de ruteadores
//Carpeta Pública
  const pathPublic=path.resolve('public');
  app.use(express.static(pathPublic));

//Declaracion de Ruteadores
  const indexRoute=require('../src/routes/indexRoute');
  const searchRoute=require('../src/routes/searchRoute');
  const productsRoute=require('../src/routes/productsRoute');  
  const cartRoute=require('../src/routes/cartRoute');
  const userRoute=require('../src/routes/userRoute');
  
//Ruteadores
  app.use('/',indexRoute);
  app.use('/user',userRoute);         //rutas: /user/
  app.use('/search',searchRoute);     //rutas: /search/
  app.use('/products',productsRoute); //rutas: /products/ ,detail/id ,edit/id ,create/
  app.use('/carrito',cartRoute);   //rutas: /carrito/idcarrito (1-4)

// Carga del servidor en puerto 5000
  app.listen(app.get('port'),()=>console.log('Server Ok in port',app.get('port')));