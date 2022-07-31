//Importación 
  //Base de datos
  const db = require('../database/models');
  const path = require('path');
  const fs=require('fs');

  //Multer Upload
  const upload = require('../middlewares/uploadMulter/uploadMulter');
  
  //Directorio de imágenes de coches Path
  const carImagePath=path.resolve('./public/products/carsImages')

  // Funciones Adicionales.
    // Extrae nombres de archivo de imagenes de multer desde req.files
    function imgsMulter(reqfiles) {
      let imgsMulter=[];
      for(let i=1;i<8;++i){
        if(reqfiles['img'+i]){
          imgsMulter[i-1]=reqfiles['img'+i][0].filename;
        }else{
          imgsMulter[i-1]=false;
        }
      }
      return imgsMulter;
    }
    //Renombrado de imagenes con id del registro y orden consecutivo.
    function imgsId(id,images) {
      let j=1;
      let imgs=["placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg"];
      for(let i=0;i<7;++i){ //para cada lugar en images hacer...
        if(images[i]){ //si imagen es distinto de false entonces
          let carImageName=images[i];  //nombre de imagen actual
          let imagePath=`${carImagePath}/${carImageName}`;  //direccion de imagen actual
          let newFilename=`${id}-img${j}${path.extname(carImageName)}`; //nuevo nombre de imagen con id y orden
          let newImagePath=`${carImagePath}/${newFilename}`;  //direccion de nuevo nombre de imagen
          fs.renameSync(imagePath,newImagePath);  // Se renombra imagen de actual por imagen con id y orden.
          imgs[j-1]=newFilename;  //guarda nuevo nombre de imagen con id en imgs
          ++j;
        }
      };
      return JSON.stringify(imgs);
    }
    // Crea car a partir del body lista todos los campos del formulario con los de la base de datos.
    function bodyCar(body,imgs="") {
      car={
        status_id:1,
        brand_id:body.brand,
        model:body.model,
        condition_id:body.condition,
        year:body.year,
        km:body.km,
        engine:body.engine,
        fuel_id:body.fuel,
        transmission_id:body.transmission,
        color_id:body.color,
        doors:body.doors,
        airbags:body.airbags,
        category_id:body.category,
        price:body.price,
        currency_id:body.currency,
        description:body.description,
        imgs:imgs
      };
      return car;
    };
    // Determina que fotos, el usuario borró, reemplazó o agregó.
    function chkImgs(reqbody,reqfiles,imgsBefore) {
      let imgs=[];
      for(let i=1;i<8;++i){
        if(reqbody['chk'+i]==='img'+i+'c'){
          imgs[i-1]=reqfiles['img'+i][0].filename;
        }else if(reqbody['chk'+i]==='del'+i && imgsBefore[i-1]!=='placeholder.svg'){
                imgs[i-1]=false;
                fs.unlinkSync(`${carImagePath}/${imgsBefore[i-1]}`);
              }else if(imgsBefore[i-1]==='placeholder.svg'){
                      imgs[i-1]=false;
                    }else{
                      imgs[i-1]=imgsBefore[i-1];
                    };
        };
        return imgs;
    }

//Controlador

  const productsController={
    //************* PANEL DE ADMINISTRADOR DE PRODUCTOS *************. 
    main:function(req, res) {
      db.Car.findAll({include:['brand','category','color','condition','currency','fuel','status','transmission'],raw:true,nest:true})
      .then(listCars => {
        console.log(listCars);
        res.render('products/products', {listCars});
      });
    },
    //**************** DETALLE producto *************.
    detail: function(req, res) {
      let id=+req.params.id;
      db.Car.findByPk(id,{include:['brand','category','color','condition','currency','fuel','status','transmission'],raw:true,nest:true})
      .then(car => {
        res.render('products/detailProducts', {car});
      });
    },
    //*************** VISTA EDICIÓN ************ (solo administrador).
    edit:function(req, res) {
      let id=+req.params.id;  //Obtiene id de req.params
      let car=db.Car.findByPk(id,{include:['brand','category','color','condition','currency','fuel','status','transmission'],raw:true,nest:true});
      let brands=db.Brand.findAll();  //Busca car con id y 
      let categories=db.Category.findAll(); //carga tablas foráneas para las listas del formulario.
      let colors=db.Color.findAll();
      let conditions=db.Condition.findAll();
      let currencies=db.Currency.findAll();
      let fuel=db.Fuel.findAll();
      let transmissions=db.Transmission.findAll();
      Promise.all([car,brands,categories,colors,conditions,currencies,fuel,transmissions])
      .then(([car,brands,categories,colors,conditions,currencies,fuel,transmissions])=> {
        res.render('products/editProducts',{car,brands,categories,colors,conditions,currencies,fuel,transmissions});
      });
    },
    //************** EDITA registro ***************. Redirige a detail/id
    edited:function (req,res) {
      let id =+req.params.id; //Obtiene id de req.params
      db.Car.findByPk(id)     //Busca car con id. 
        .then(carBefore=> {
          let imgsBefore=JSON.parse(carBefore.imgs);  //Del car encontrado extrae array de nombres de imagenes.
          let checkedImgs=chkImgs(req.body,req.files,imgsBefore); //Chequea que imagenes borro, cambio o agregó el usuario.
          let imgs=imgsId(id,checkedImgs);  //Renombra imagenes con id y las ordena, devuelve string.
          let car=bodyCar(req.body,imgs);  //Crea car para actualizar registro.
          db.Car.update(                    //Actualiza registro con imagenes actualizadas
            {...car},
            {where:{id:id}}
          )
            .then(result => {
              res.redirect(`/products/detail/${id}`); //Redirige a detalle de producto.
            });
        });
    },
    //Middleware de multer que sube archivos fotos.
    upload:upload.fields([
      {name:"img1",maxCount:1},
      {name:"img2",maxCount:1},
      {name:"img3",maxCount:1},
      {name:"img4",maxCount:1},
      {name:"img5",maxCount:1},
      {name:"img6",maxCount:1},
      {name:"img7",maxCount:1}
    ]),
    //*************** VISTA CREAR ************ (solo administrador).
    create: (req, res) => {
      let brands=db.Brand.findAll();    //Carga tablas foráneas para las listas del formulario.
      let categories=db.Category.findAll();
      let colors=db.Color.findAll();
      let conditions=db.Condition.findAll();
      let currencies=db.Currency.findAll();
      let fuel=db.Fuel.findAll();
      let transmissions=db.Transmission.findAll();
      let car={imgs:["placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg","placeholder.svg"]};
      Promise.all([brands,categories,colors,conditions,currencies,fuel,transmissions])
      .then(([brands,categories,colors,conditions,currencies,fuel,transmissions])=> {
        res.render('products/createProducts',{car,brands,categories,colors,conditions,currencies,fuel,transmissions});
      });
    },
    //*************** AGREGA nuevo registro. ************* (Redirige a detail/id).
    created:(req,res) => {
      let car=bodyCar(req.body);  //Crea car apartir del formulario dejando imgs vacio.
      db.Car.create(car)          //Crea nuevo registro de car.
      .then(result => {
        let id=result.dataValues.id;  //Obtiene id del nuevo registro recién creado.
        let images=imgsMulter(req.files); //Crea un array con los nombres de las imagenes de multer.
        let imgs=imgsId(id,images); //Coloca id y ordena consecutivamente nombres de imagenes y devuelve string.
        db.Car.update(      //Actualiza registro con imagenes renombradas con id y en orden.
          {imgs:imgs},
          {where:{id:id}}
        )
          .then(result => {
            return res.redirect(`/products/detail/${id}`); //Redirige a detalle de producto.
          });
      });
    },
    //***************** ELIMINA.************* (Redirige al administrador de productos).
    deleted:(req, res) => {
      let id=+req.params.id;  //Obtiene id de req.params
      db.Car.findByPk(id)     //Busca car con id. 
        .then( car=> {
          let images=JSON.parse(car.imgs);  //Del car encontrado extrae array de nombres de imagenes.
          images.forEach(image=>            //Elimina las imagenes del directorio.
            image==="placeholder.svg"?0:fs.unlinkSync(`${carImagePath}/${image}`)
          );
          db.Car.destroy({    //Una vez eliminadas las imagenes, elimina el registro.
            where:{id:id}
          })
            .then( result=> {
              res.redirect('/products');  //Redirige al administrador de productos.
            });
        });
    },
  }

module.exports = productsController;