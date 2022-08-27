import React from 'react';
import './UserCardS.css';

function UserCardS({last}){
  let{name, surname,userType,dni,birth,address,phone,email,location,img}=last;
  let userPhoto = `//localhost:5001/users/images/${img}`;
  return (
    <div className='UserCardS'>
      <div className="UserCardS__top">
        <div className="UserCardS__photo">
          <img src={userPhoto} alt="" className="UserCardS__img" />
        </div>
        <div className="UserCardS__header">
          <p className="UserCardS__pTitle">Último Usuario</p>
          <p className="UserCardS__pName">{name} {surname}</p>
          <p className="UserCardS__pText">Tipo: {userType.name}</p>
        </div>
      </div>
      <div className="UserCardS__btm">
        <div className="UserCardS__left">
          <p className="UserCardS__pData"><span className="UserCardS__sData">DNI: </span>
            {dni}
          </p>
          <p className="UserCardS__pData"><span className="UserCardS__sData">Cumpleaños: </span>
            {birth}
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
                {location.state.name}
                </p>
              </div>
              <div className="UserCardS__data">
                <p className="UserCardS__pData"><span className="UserCardS__sData">Localidad: </span>
                {location.name}
                </p>
              </div>
        </div>
      </div>
    </div>
  )
}
export default UserCardS;