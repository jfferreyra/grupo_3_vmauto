import React from 'react';
import './MetricTop.css';
import TotalCard from '../TotalCard/TotalCard';
import StickCard from '../StickCard/StickCard';
import BarVCard from '../BarVCard/BarVCard';
let {userTitle,userCount,carTitle,carCount}={userTitle:'Total Usuarios',userCount:325,carTitle:'Total Coches',carCount:2658}

function MetricTop({totalUser,totalCar,condition,fuel,transmission}){
  let news=condition[0].count;
  let used=condition[1].count;
  let manual=transmission[0].count;
  let automatic=transmission[1].count;
  return (
    <div className='MetricTop'>
      <TotalCard title={userTitle} count={totalUser} />
      <TotalCard title={carTitle} count={totalCar} />
      <StickCard catA={'Nuevos'} catB={'Usados'} countA={news} countB={used} catC={'Caja Manual'} catD={'Caja Automática'} countC={manual} countD={automatic}/>
      <BarVCard fuel={fuel} />
    </div>
  )
}
export default MetricTop;