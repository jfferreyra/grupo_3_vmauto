const {body}=require('express-validator');

//Validaciones para el login

const loginValidations=[
  body('email').notEmpty().withMessage('Email no puede estar vacío.').bail()
               .isLength({min:12}).withMessage('12 caracteres como mínimo.').bail()
               .isEmail().withMessage('Introduzca un email válido.').bail(),
  body('pass').notEmpty().withMessage('Debe introducir una contraseña.').bail()
              .isLength({min:6,max:12}).withMessage('6 caracteres como minimo y 12 como máximo.').bail()
]

module.exports =loginValidations;