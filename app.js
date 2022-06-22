//Importación de módulos
  const path=require('path');
  const express=require('express');
  const app=express();
  const methodOverride=require('method-override');

  

//Post por formulario.
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(methodOverride('_method'));

//Declaracion de variables

  //Puerto
  app.set('port',process.env.PORT||5000);

  //Ejs
  app.set('views', path.resolve('views'));
  app.set('view engine','ejs');

// Declaracion y uso de ruteadores
//Carpeta Pública
  const pathPublic=path.resolve('public');
  app.use(express.static(pathPublic));

//Declaracion de Ruteadores
  const indexRoute=require('./routes/indexRoute');
  const searchRoute=require('./routes/searchRoute');
  const productsRoute=require('./routes/productsRoute');  
  const carritoRoute=require('./routes/carritoRoute');
  const registerRoute=require('./routes/registerRoute');
  const loginRoute=require('./routes/loginRoute');
  
//Ruteadores
  app.use('/',indexRoute);
  app.use('/search',searchRoute);     //rutas: /search/
  app.use('/products',productsRoute); //rutas: /products/ ,detail/id ,edit/id ,create/
  app.use('/carrito',carritoRoute);   //rutas: /carrito/idcarrito (1-4)
  app.use('/register',registerRoute); //rutas: /register/
  app.use('/login',loginRoute);       //rutas: /login/

// Carga del servidor en puerto 5000
  app.listen(app.get('port'),()=>console.log('Server Ok in port',app.get('port')));