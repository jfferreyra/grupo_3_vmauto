import React from 'react';
import './CarCardS.css';
import CarPhoto from '../../assets/img/jpg/audi1.webp';

function CarCardS({last}){
  let{brand, model,year,condition,km,engine,color,category,fuel,transmission,doors,airbags,imgs}=last;
  let carPhoto = `//localhost:5001/products/carsImages/${JSON.parse(imgs)[0]}`;
  return (
    <div className='CarCardS'>
      <div className="CarCardS__top">
        <div className="CarCardS__photo">
          <img src={carPhoto} alt="" className="CarCardS__img" />
        </div>
        <div className="CarCardS__header">
          <p className="CarCardS__pTitle">Último Coche</p>
          <p className="CarCardS__pName">{brand.name} {model}</p>
          <p className="CarCardS__pText">Año: {year}</p>
          <p className="CarCardS__pText">Condición: {condition.name}</p>
        </div>
      </div>
      <div className="CarCardS__btm">
        <div className="CarCardS__left">
          <p className="CarCardS__pData"><span className="CarCardS__sData">Kms: </span>
            {km}
          </p>
          <p className="CarCardS__pData"><span className="CarCardS__sData">Motor: </span>
            {engine}
          </p>
          <p className="CarCardS__pData"><span className="CarCardS__sData">Color: </span>
          {color.name}
          </p>
          <p className="CarCardS__pData"><span className="CarCardS__sData">Categoria: </span>
          {category.name}
          </p>
        </div>
        <div className="CarCardS__right">
          <p className="CarCardS__pData"><span className="CarCardS__sData">Combustible: </span>
            {fuel.name}
          </p>
          <p className="CarCardS__pData"><span className="CarCardS__sData">Transmisión: </span>
            {transmission.name}
          </p>
          <p className="CarCardS__pData"><span className="CarCardS__sData">Puertas: </span>
          {doors}
          </p>
          <p className="CarCardS__pData"><span className="CarCardS__sData">Airbags: </span>
          {airbags}
          </p>
        </div>
      </div>
    </div>
  )
}
export default CarCardS;