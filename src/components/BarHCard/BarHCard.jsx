import React from 'react';
import BarH from './BarH/BarH';
import './BarHCard.css';

let categories=[
  {name:"Van-rural",count:156},
  {name:"Deportivo",count:2000},
  {name:"Pickup",count:700},
  {name:"Hatchback",count:450},
  {name:"Sedan",count:925},
  {name:"Suv",count:1020},
  {name:"Utilitario",count:1560}
];
let counts=categories.map(cat=>cat.count);
let maxCount=Math.max.apply(null,counts);

function BarHCard(){
  return (
    <div className='BarHCard'>
      {categories.map((cat,i)=>
        <BarH count={cat.count} name={cat.name} percent={cat.count/maxCount} key={i} i={i}/>
      )}
    </div>
  )
}
export default BarHCard;