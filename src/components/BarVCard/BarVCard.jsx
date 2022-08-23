import React from 'react';
import BarV from './BarV/BarV';
import './BarVCard.css';

let categories=[
  {name:"Nafta",count:156},
  {name:"Diesel",count:2000},
  {name:"GNC",count:700},
  {name:"Híbrido",count:450},
  {name:"Eléctrico",count:925}
];
let counts=categories.map(cat=>cat.count);
let maxCount=Math.max.apply(null,counts);

function BarVCard(){
  return (
    <div className='BarVCard'>
      <p className='BarVCard__pTitle'>Combustible</p>
      {categories.map((cat,i)=>
        <BarV count={cat.count} name={cat.name} percent={cat.count/maxCount} key={i} i={i}/>
      )}
    </div>
  )
}
export default BarVCard;