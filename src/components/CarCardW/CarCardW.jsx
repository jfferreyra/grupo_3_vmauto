import React from 'react';
import './CarCardW.css';
import userPhoto from '../../assets/img/jpg/ToyotaHilux.webp';

let user={
  brand:'Toyota',
  model:'Hilux',
  year:2022,
  condition:'Nuevo',
  category:'Pickup',
  km:0,
  price:19000000,
  transmission:'Manual',
  fuel:'Diesel',
  engine:'3.2',
  color:'Rojo',
  doors:4,
  airbags:4,
  currency:'$'
}
let{brand,model,year,condition,category,km,price,transmission,fuel,engine,color,doors,airbags,currency}=user;

function CarCardW(){
  return (
    <div className='CarCardW'>
      <div className="CarCardW__left">
        <div className="CarCardW__photo">
          <img src={userPhoto} alt="" className="CarCardW__img" />
        </div>
        <div className="CarCardW__header">
          <p className="CarCardW__pTitle">Coche {condition}</p>
          <p className="CarCardW__pName">{brand} {model}</p>
          <p className="CarCardW__pText">Año: {year}</p>
        </div>
      </div>
      <div className="CarCardW__data">
        <p className="CarCardW__pData"><span className="CarCardW__sData">Kms: </span>
          {km}
        </p>
        <p className="CarCardW__pData"><span className="CarCardW__sData">Combustible: </span>
          {fuel}
        </p>
        <p className="CarCardW__pData"><span className="CarCardW__sData">Transmisión: </span>
          {transmission}
        </p>
        <p className="CarCardW__pData"><span className="CarCardW__sData">Puertas: </span>
          {doors}
        </p>
      </div>
      <div className="CarCardW__data">
        <p className="CarCardW__pData"><span className="CarCardW__sData">Motor: </span>
          {engine}
        </p>
        <p className="CarCardW__pData"><span className="CarCardW__sData">Color: </span>
          {color}
        </p>
        <p className="CarCardW__pData"><span className="CarCardW__sData">Categoría: </span>
          {category}
        </p>
        <p className="CarCardW__pData"><span className="CarCardW__sData">Airbags: </span>
          {airbags}
        </p>
      </div>
      <div className="CarCardW__priceBtn">
        <div className="CarCardW__price">
          <p>{price} {currency}</p>
        </div>
        <div className="CarCardW__buttons">
          <div className="CarCardW__btnEdit"><i className="rIcon-edit"></i></div>
          <div className="CarCardW__btnDelete"><i className="rIcon-delete"></i></div>
        </div>
      </div>
    </div>
  )
}
export default CarCardW;