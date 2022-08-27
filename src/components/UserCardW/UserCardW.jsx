import React from 'react';
import './UserCardW.css';

function UserCardW({user,destroy}){
  let{id,name, surname,dni,birth,address,type,phone,state,email,location,image_url}=user;
  let userPhoto = image_url;
  return (
    <div className='UserCardW'>
      <div className="UserCardW__left">
        <div className="UserCardW__photo">
          <img src={userPhoto} alt="" className="UserCardW__img" />
        </div>
        <div className="UserCardW__header">
          <p className="UserCardW__pTitle">{type}</p>
          <p className="UserCardW__pName">{name} {surname}</p>
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
          {state}
        </p>
        <p className="UserCardW__pData"><span className="UserCardW__sData">Localidad: </span>
          {location}
        </p>
        <p className="UserCardW__pData"><span className="UserCardW__sData">Cumpleaños: </span>
          {birth}
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
          <div className="UserCardW__btnDelete" onClick={()=>destroy(id)}><i className="rIcon-delete"></i></div>
        </div>
      </div>
    </div>
  )
}
export default UserCardW;