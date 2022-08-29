import React from 'react';
import BarH from './BarH/BarH';
import './BarHCard.css';

function BarHCard({categories}){
  
  let counts=categories.map(cat=>cat.count);
  let maxCount=Math.max.apply(null,counts);

  return (
    <div className='BarHCard'>
      {categories.map((cat,i)=>
        <BarH count={cat.count} name={cat.name} percent={cat.count/maxCount} key={i} i={i}/>
      )}
    </div>
  )
}
export default BarHCard;