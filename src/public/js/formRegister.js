const locationsAll=JSON.parse(document.currentScript.dataset.param1); //Recibe de vista Todas las localidades de todas las provincias
window.addEventListener('load',function () {  //Cuando carga la pagina
  let name=document.getElementById('name'); //Captura campo nombre para poner foco al finalizar
  let state=document.getElementById('state'); //Captura campo state (provincia)
  let location=document.getElementById('location'); //Captura campo location (localidad)
  state.addEventListener('change',function () {   //Pone en escucha al campo state
    let stateId=+this.value;  //Captura el id de la provincia desde el valor de la selección.
    let locations=locationsAll.filter(location=>location.state_id===stateId); //Filtra las localidades que pertenecen a esa provincia.
    let fragment=document.createDocumentFragment(); //Crea un fragment donde colocar las localidades
    let optionFirst=document.createElement('option'); //Crea la primera opcion que aparecerá cuando no esté seleccionada
      optionFirst.textContent="Elija su Localidad"; //ninguna provincia 
      optionFirst.value=0; //Su valor es id=0 pues es la primera y la base de datos empieza en 1 asi no hay problemas
      optionFirst.setAttribute('disabled','disabled');//La crea deshabilitada
      optionFirst.setAttribute('selected','selected');  //Y seleccionada por defecto
      fragment.appendChild(optionFirst);  //La agrega a la lista de opciones
    locations.forEach(location => { //Para cada localidad
      let option=document.createElement('option');//Crea una opcion
      option.textContent=location.name;//Con el contenido del nombre de la localidad
      option.value=location.id; //y el valor igual a su id
      fragment.appendChild(option); // Lo agrega al fragment 
    });
    location.replaceChildren(fragment); //Agrega el fragment con todas las localidades de la provincia seleccionada
  });
  name.focus(); //Pone en foco al campo name
})