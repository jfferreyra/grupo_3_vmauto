import React from 'react';
import './TotalCard.css'
function TotalCard(props){
  let {title,count} = props;
  return (
    <div className='TotalCard' >
      <p className='TotalCard__pTitle'>{title}</p>
      <p className='TotalCard__pCount'>{count}</p>
    </div>
  )
}
export default TotalCard;