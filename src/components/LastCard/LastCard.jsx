import React from 'react';
import './LastCard.css'
import {useParams} from 'react-router-dom';
import UserCardS from '../UserCardS/UserCardS';
import CarCardS from '../CarCardS/CarCardS';


function LastCard({lastUser,lastCar}){
  let {lastOp}=useParams();
  return (
    <div className='LastCard'>
      {lastOp==="lastUser" ? <UserCardS last={lastUser}/>:<CarCardS last={lastCar}/>}
    </div>
  )
}
export default LastCard;