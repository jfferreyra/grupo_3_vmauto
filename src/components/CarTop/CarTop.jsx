import React from 'react';
import './CarTop.css';
import CarCardW from '../CarCardW/CarCardW';
import TotalCard from '../TotalCard/TotalCard';
let {carTitle,carCount}={carTitle:'Total Coches',carCount:2658,}

function CarTop(){
  return (
    <div className='CarTop'>
      <TotalCard title={carTitle} count={carCount} />
      <CarCardW />
    </div>
  )
}
export default CarTop;