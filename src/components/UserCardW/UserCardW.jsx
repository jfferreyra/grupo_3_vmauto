import React from 'react';
import './UserCardW.css';
import userPhoto from '../../assets/img/jpg/mac2giver.jpg';

let user={
  name:'Richard Dean',
  surname:'Anderson',
  type:'usuario',
  dni:'22777555',
  born:'1950-01-23',
  address:'Victorinox 234',
  phone:'+549351656894',
  email:'macgiver@gmail.com',
  states:'Córdoba',
  location:'Córdoba'
}
let{name, surname,type,dni,born,address,phone,email,states,location}=user;

function UserCardW(){
  return (
    <div className='UserCardW'>
      <div className="UserCardW__left">
        <div className="UserCardW__photo">
          <img src={userPhoto} alt="" className="UserCardW__img" />
        </div>
        <div className="UserCardW__header">
          <p className="UserCardW__pTitle">Usuario</p>
          <p className="UserCardW__pName">{name} {surname}</p>
          <p className="UserCardW__pText">Tipo: {type}</p>
        </div>
      </div>
      <div className="UserCardW__data">
        <p className="UserCardW__pData"><span className="UserCardW__sData">DNI: </span>
          {dni}
        </p>
        <p className="UserCardW__pData"><span className="UserCardW__sData">Email: </span>
          {email}
        </p>
        <p className="UserCardW__pData"><span className="UserCardW__sData">teléfono: </span>
          {phone}
        </p>
      </div>
      <div className="UserCardW__data">
        <p className="UserCardW__pData"><span className="UserCardW__sData">Provincia: </span>
          {states}
        </p>
        <p className="UserCardW__pData"><span className="UserCardW__sData">Localidad: </span>
          {location}
        </p>
        <p className="UserCardW__pData"><span className="UserCardW__sData">Cumpleaños: </span>
          {born}
        </p>
      </div>
      <div className="UserCardW__addressBtn">
        <div className="UserCardW__address">
          <p className="UserCardW__pData"><span className="UserCardW__sData">Domicilio: </span><br></br>
          {address}
          </p>
        </div>
        <div className="UserCardW__buttons">
          <div className="UserCardW__btnEdit"><i className="rIcon-edit"></i></div>
          <div className="UserCardW__btnDelete"><i className="rIcon-delete"></i></div>
        </div>
      </div>
    </div>
  )
}
export default UserCardW;