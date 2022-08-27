import React from 'react';
import './CarTop.css';
import CarCardW from '../CarCardW/CarCardW';
import TotalCard from '../TotalCard/TotalCard';

let carTitle='Total Coches';

function CarTop({count,car,destroy}){
  return (
    <div className='CarTop'>
      <TotalCard title={carTitle} count={count} />
      <CarCardW car={car} destroy={destroy}/>
    </div>
  )
}
export default CarTop;