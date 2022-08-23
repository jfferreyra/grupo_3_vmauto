import React from 'react';
import './UserCardS.css';
import userPhoto from '../../assets/img/jpg/lobo.jpg';

let user={
  name:'Jan Michael',
  surname:'Vincent',
  type:'usuario',
  dni:'22777888',
  born:'1944-07-15',
  address:'Lobo 235',
  phone:'+549351656895',
  email:'lobo@gmail.com',
  states:'Córdoba',
  location:'Córdoba'
}
let{name, surname,type,dni,born,address,phone,email,states,location}=user;

function UserCardS(){
  return (
    <div className='UserCardS'>
      <div className="UserCardS__top">
        <div className="UserCardS__photo">
          <img src={userPhoto} alt="" className="UserCardS__img" />
        </div>
        <div className="UserCardS__header">
          <p className="UserCardS__pTitle">Último Usuario</p>
          <p className="UserCardS__pName">{name} {surname}</p>
          <p className="UserCardS__pText">Tipo: {type}</p>
        </div>
      </div>
      <div className="UserCardS__btm">
        <div className="UserCardS__left">
          <p className="UserCardS__pData"><span className="UserCardS__sData">DNI: </span>
            {dni}
          </p>
          <p className="UserCardS__pData"><span className="UserCardS__sData">Cumpleaños: </span>
            {born}
          </p>
          <div className="UserCardS__address">
            <p className="UserCardS__pData"><span className="UserCardS__sData">Domicilio: </span><br></br>
            {address}
            </p>
          </div>
        </div>
        <div className="UserCardS__right">
          <p className="UserCardS__pData"><span className="UserCardS__sData">teléfono: </span>
            {phone}
          </p>
          <p className="UserCardS__pData"><span className="UserCardS__sData">Email: </span>
            {email}
          </p>
          <div className="UserCardS__data">
                <p className="UserCardS__pData"><span className="UserCardS__sData">Provincia: </span>
                {states}
                </p>
              </div>
              <div className="UserCardS__data">
                <p className="UserCardS__pData"><span className="UserCardS__sData">Localidad: </span>
                {location}
                </p>
              </div>
        </div>
      </div>
    </div>
  )
}
export default UserCardS;