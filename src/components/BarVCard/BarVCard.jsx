import React from 'react';
import BarV from './BarV/BarV';
import './BarVCard.css';

function BarVCard({fuel}){
  let counts=fuel.map(f=>f.count);
  let maxCount=Math.max.apply(null,counts);
  return (
    <div className='BarVCard'>
      <p className='BarVCard__pTitle'>Combustible</p>
      {fuel.map((f,i)=>
        <BarV count={f.count} name={f.fuel.name} percent={f.count/maxCount} key={i} i={i}/>
      )}
    </div>
  )
}
export default BarVCard;