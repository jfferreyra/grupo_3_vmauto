window.addEventListener('load',function(e){
 
// Función Validator
function valField(ok,f,l,field,validations,ulField,classes,btnSubmit) {  //Validación del Campo.(campo a validar, validaciones, donde van a ir los mensajes de errores)
    let results=validations.filter(validation=>validation.val(field.value)===false); // Filtra en las validaciones false o sea los errores.
    let msgs=results.map(result=>result.msg); //Deja en un array solo los mensajes de error
    if(msgs.length>0){  //Si msgs es distinto de cero es porque hay errores
        btnSubmit.disabled=true;    //Deshabilito boton submit porque hay errores.
        btnSubmit.classList.add(classes.btnDisabled);
        ulField.classList.add(classes.msgClass); //Le agrega una clase de alerta de error
        field.classList.add(classes.inpClass.invalid);  //agrega clase invalido
        field.classList.remove(classes.inpClass.valid); //quita clase valido
        let fragment=document.createDocumentFragment(); //Crea un fragmento de html vacio (es para no abrir a cada rato el dom es como un array de elementos html)
        msgs.forEach(msg => {   //para cada mensaje de error construye un li y lo agrega a fragment.
            let li=document.createElement(classes.tagError); // crea li
            li.textContent=msg; // le pone el mensaje
            fragment.appendChild(li);   //lo agrega a fragment
            });
            ulField.replaceChildren(fragment); //remplaza el fragment en el ul de los errores del campo (cada campo tiene uno ver el html)
            ok[f]= 0; //retorna cero pues hay errores.
    }else{
        ulField.innerHTML=""; // como no hay errores borra el contenido de ul de errores del campo.
        ulField.classList.remove(classes.msgClass); //Le quita la clase de alerta de error al contenedor de errores
        field.classList.add(classes.inpClass.valid);    //agrega clase valido
        field.classList.remove(classes.inpClass.invalid);//quita clase invalido
        ok[f]= 1; //retorna 1 pues no hay errores
        // console.log(ok);
        let sum = ok.reduce((a,e)=>a+e);    //Hace la suma de las componentes del array de ok
        // console.log(sum);
        // console.log(l);
        if(sum===l){ //Si da igual a l (la cantidad de campos a validar o sea todos 1s)
            btnSubmit.disabled=false;   //Habilita botón submit
            btnSubmit.classList.remove(classes.btnDisabled);   //Quita al botón submit la clase deshabilitado.
        }else{
            btnSubmit.disabled=true; //Si la suma no da l entonces hay errores en algún campo y deshabilita el submit.
            btnSubmit.classList.add(classes.btnDisabled);   //Agrega al botón submit la clase para cuando está deshabilitado.
        }
    }
    return ok;
}
// Funcion Validación de Formulario
function valForm(submitId,fields,classes){  //Validación del formulario
    let ok=[]; //Crea un array con 0 si hay errores o 1 si no hay errores. Primero lo declara vacio.
    let l=fields.length; //Obtiene la cantidad de campos a validar, será el valor de la suma objetivo para saber si todos los campos estan sin errores.
    let btnSubmit=document.getElementById(submitId); //Captura el botón submit
    btnSubmit.disabled=true;    //Deshabilito boton submit por defecto.
    btnSubmit.classList.add(classes.btnDisabled);   //Agrega al botón submit una clase para cuando está deshabilitado.
    fields.forEach((field,i) => {   //Itera en cada campo, i es el índice del campo actual.
        let element=document.getElementById(field.id); //Captura el campo
        let ulField=document.createElement(classes.contErrors);   //Crea un ul en el html
        element.after(ulField); //Lo sitúa a continuación del campo
        field.events.forEach(event => {
            element.addEventListener(event,function(e){    //Agrega escucha de evento keyup al campo
                ok=valField(ok,i,l,this,field.validations,ulField,classes,btnSubmit);    //Ejecuta validador de campo, devuelve 1 si cumple todas o 0 sino.
            });
        });
        if(element.value){
            ok=valField(ok,i,l,element,field.validations,ulField,classes,btnSubmit); // Si el valor al iniciar ya tiene un valor lo valida haciendo foco
        }
    });
}
    
//INSTRUCCIONES: (COMPLETAR abajo)
//Classes acá van las clases de los mensajes y de los inputs. (esto es estetico css)
    // 1) msgClass: aca va el nombre de la clase para los mensajes de error.
    // 2) inpClass: es un objeto con valid: donde va el nombre de la clase para el campo cuando 
    //    no tiene errores, e invalid: donde va el nombre de la clase cuando es inválido.
    // 3) btnDisabled: va el nombre de la clase para el botón deshabilitado.
    // 4) contErrors y tagError, ahi van los tipos de etiqueta html que se desean para el contenedor
    //    de errores y para cada error del campo respectivamente.(ejemplos: ul con li, div con p, div con div, etc)

classes={
    msgClass:"alert-warning",   // siempre poner los nombres entre comillas como se muestra aca va la clase para los mensajes de error
    inpClass:{valid:"is-valid",invalid:"is-invalid"},// aca va las clases para los campos de entrada
    btnDisabled:"btnSubmitDisabled", // aca se coloca la clase botón deshabilitado
    contErrors:"ul", //Etiqueta del contenedor de todos los errores de un campo
    tagError:"li" //Etiqueta donde va un error de campo
};

//Fields aca (ver mas abajo array fields) van todas las validaciones y mensajes de error identificados por campo.
    //El programador debe:
    // 1) Colocar ids de campos de entrada como figuran en el html (ejemplo id="nombre")
    //    Tantos como se quiera validar. Cada uno sera objeto y un elemento de fields 
    // 2) Llenar el array de validaciones para cada campo. El array tiene:
    //    a) val es un callback con el parametro value que representa el valor del campo.
    //      Se puede cambiar la palabra "value" por cualquier otra siempre que se cambie también adentro de
    //      cuerpo de la función. 
    //      En el cuerpo de la función se debe colocar la logica de la validacion por ejemplo value debe ser
    //      mayor a 5 (value>5).
    //    b) msg es el mensaje que se devolverá si la condición del callback no se cumple.
    //    c) Se colocan tantos objetos validation como se quiera y se cierra el array validations.
    // 3) Array events cada elemento será un evento que se desee capturar, van entre comillas.
    // 4) Colocar el Id del boton submit del formulario en el primer argumento del llamado a valForm

    //Expresion regular de la Estandard Official: RFC 5322 para el email
    const exEmail=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    //Expresiones Regulares usadas mas abajo
    const name=/^([a-zA-ZñÑñÑüÜ]+\s?[a-zA-ZñÑüÜ]+)*$/;
    const dni=/^\d+$/;
    const address=/^([\w+ñÑñÑüÜ\.]+\s?[\w+ñÑñÑüÜ]+)*$/;
    const phone=/^\+\d+$/;
    const pass=/^(?=\w*\d)(?=\w*[a-z])\S{6,12}$/;

fields=[
    {
        id:"name",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar un Nombre."},
            {val:(value)=>{return value.length>=3},msg:"Debe tener al menos 3 caracteres."},
            {val:(value)=>{return name.test(value)},msg:"Sólo letras sin espacios al inicio o al final."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    }, //aca termina un campo y sigue el otro. no olvidar la coma si sigue otro. Se ponen la cantidad que quiera.
    {
        id:"surname",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar un Apellido."},
            {val:(value)=>{return value.length>=3},msg:"Debe tener al menos 3 caracteres."},
            {val:(value)=>{return name.test(value)},msg:"Sólo letras sin espacios al inicio o al final."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    }, //aca termina un campo y sigue el otro. no olvidar la coma si sigue otro. Se ponen la cantidad que quiera.
    {
        id:"dni",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar un DNI."},
            {val:(value)=>{return value.length>=7&&value.length<=8},msg:"Debe tener entre 7 y 8 números."},
            {val:(value)=>{return dni.test(value)},msg:"Sólo números."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"birth",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar una fecha."},
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"state",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe seleccionar una Provincia."},
            {val:(value)=>{return value!=="0"},msg:"Debe seleccionar una Provincia."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"location",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe seleccionar una localidad."},
            {val:(value)=>{return value!=="0"},msg:"Debe seleccionar una localidad."},
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"address",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar una dirección."},
            {val:(value)=>{return value.length>=5},msg:"Debe tener al menos 5 caracteres."},
            {val:(value)=>{return address.test(value)},msg:"Sin espacios al inicio o al final."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"phone",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar un teléfono."},
            {val:(value)=>{return value.length===14},msg:"Debe tener 14 caractéres."},
            {val:(value)=>{return phone.test(value)},msg:"Sólo números y + al principio."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"email",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar un email."},
            {val:(value)=>{return value.length>=12},msg:"Debe tener al menos 12 caractéres."},
            {val:(value)=>{return exEmail.test(value)},msg:"Debe ser un email válido."}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    },
    {
        id:"pass",     //id del campo en el html
        validations:[   //val es un callback con parametro value (es el valor del campo, el programador solo debe cambiar la condición) y retorna una condición.(que la establece el programador)
            {val:(value)=>{return value!==""},msg:"Debe ingresar una contraseña."},
            {val:(value)=>{return pass.test(value)},msg:"La contraseña debe tener entre 6 y 12 caracteres, y al menos un dígito"}
        ],
        events:["keyup","blur","focus","change"]   // Aca van los eventos que uno quiera, separados por comas y entre comillas.
    }
]   //Aca termina fields (configuración de las validaciones y campos).

valForm("btnReg",fields,classes); //Ejecuta la validación del formulario. Sólo se llena btnSubmit.
//no olvidar poner el id del botón submit donde dice "btnSubmit". Listo 

})