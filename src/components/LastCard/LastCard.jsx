import React from 'react';
import './LastCard.css'
import {useParams} from 'react-router-dom';
import UserCardS from '../UserCardS/UserCardS';
import CarCardS from '../CarCardS/CarCardS';


function LastCard(props){
  let {last}=useParams();
  return (
    <div className='LastCard'>
      {last==="lastUser" ? <UserCardS/>:
      last==="lastCar" && <CarCardS/>}
    </div>
  )
}
export default LastCard;