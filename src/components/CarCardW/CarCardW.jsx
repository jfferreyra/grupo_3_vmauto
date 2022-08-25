import React from 'react';
import './CarCardW.css';

function CarCardW({car}){
  let{brand, model,year,condition,km,engine,fuel,transmission,color,doors,airbags,category,price,currencySymbol,image_url}=car;
  let carPhoto = image_url;
  return (
    <div className='CarCardW'>
      <div className="CarCardW__left">
        <div className="CarCardW__photo">
          <img src={carPhoto} alt="" className="CarCardW__img" />
        </div>
        <div className="CarCardW__header">
          <p className="CarCardW__pTitle">{condition}</p>
          <p className="CarCardW__pName">{brand} {model}</p>
          <p className="CarCardW__pText">Año: {year}</p>
        </div>
      </div>
      <div className="CarCardW__data">
        <p className="CarCardW__pData"><span className="CarCardW__sData">Kms: </span>
          {Intl.NumberFormat('de-DE').format(km)}
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
          <p>{Intl.NumberFormat('de-DE').format(price)} {currencySymbol}</p>
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