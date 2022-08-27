const {body}=require('express-validator');

//Validaciones para el login
console.log('pase por validator')
const productValidations = [
  // Validacion Marca

  body('model').notEmpty().withMessage('No puede estar vacío.').bail()
                .isLength({min:3}).withMessage('Debe contener al menos 3 caracteres.').bail(),
  body('description').notEmpty().withMessage('No puede estar vacío.').bail()
                      .isLength({min:5}).withMessage('Debe tener al menos 5 caracteres.').bail(),
  body('condition').notEmpty().withMessage('No puede estar vacío.').bail(),
  body('year').notEmpty().withMessage('No puede estar vacío.'),
  body('km').notEmpty().withMessage('No puede estar vacío.'),
  body('engine').notEmpty().withMessage('No puede estar vacío.'),
  body('price').notEmpty().withMessage('No puede estar vacío.'),
  body('currency').notEmpty().withMessage('No puede estar vacío.'),
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

module.exports = productValidations;