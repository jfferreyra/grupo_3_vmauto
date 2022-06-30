const {body}=require('express-validator');
const path=require('path');

//Validaciones para el register

const registerValidations=[
  body('name').notEmpty().withMessage('Nombres no puede estar vacío.').bail()
              .isLength({min:3}).withMessage('3 caracteres como mínimo.').bail()
              .isAlpha().withMessage('Solo letras.').bail(),
  body('surname').notEmpty().withMessage('Apellidos no puede estar vacío.').bail()
                 .isLength({min:3}).withMessage('3 caracteres como mínimo.').bail()
                 .isAlpha().withMessage('Solo letras.').bail(),
  body('dni').matches(/^\d{7,8}$/).withMessage('Introduzca un DNI válido sin puntos.').bail(),
  body('birth').notEmpty().withMessage('Debe introducir un fecha.').bail(),
  body('address').notEmpty().withMessage('Debe introducir una dirección.').bail(),
  body('phone').isMobilePhone(['es-AR']).withMessage('Introduzca un Teléfono válido.').bail(),
  body('email').isLength({min:12}).withMessage('12 caracteres como mínimo.').bail()
               .isEmail().withMessage('Introduzca un email válido.').bail(),
  body('pass').notEmpty().withMessage('Debe introducir una contraseña.').bail()
              .isLength({min:6,max:12}).withMessage('6 caracteres como mínimo y 12 como máximo.').bail(),
  body('img').custom((value,{req})=>{
    let file=req.file;
    let acceptedExtensions=['.jpg','.webp','.png','.gif'];
    if(file){
      let fileExtension=path.extname(file.originalname);
      if(!acceptedExtensions.includes(fileExtension)){
        throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(',')}`);
      };
    };
    return true;
  })
]

module.exports =registerValidations;