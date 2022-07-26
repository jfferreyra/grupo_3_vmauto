const locationsAll=JSON.parse(document.currentScript.dataset.param1);
window.addEventListener('load',function () {
  let name=document.getElementById('name');
  let state=document.getElementById('state');
  let location=document.getElementById('location');
  state.addEventListener('change',function () {
    let stateId=+this.value;
    let locations=locationsAll.filter(location=>location.state_id===stateId);
    let fragment=document.createDocumentFragment();
    let optionFirst=document.createElement('option');
      optionFirst.textContent="Elija su Localidad";
      optionFirst.value=0;
      optionFirst.setAttribute('disabled','disabled');
      optionFirst.setAttribute('selected','selected');
      fragment.appendChild(optionFirst);
    locations.forEach(location => {
      let option=document.createElement('option');
      option.textContent=location.name;
      option.value=location.id;
      fragment.appendChild(option);
    });
    location.replaceChildren(fragment);
  });
  name.focus();
})