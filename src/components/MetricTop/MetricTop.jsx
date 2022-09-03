import React from 'react';
import './MetricTop.css';
import TotalCard from '../TotalCard/TotalCard';
import StickCard from '../StickCard/StickCard';
import BarVCard from '../BarVCard/BarVCard';

function MetricTop({totalUser,totalCar,condition,fuel,transmission}){
  let news=condition[0].count;
  let used=condition[1].count;
  let manual=transmission[0].count;
  let automatic=transmission[1].count;
  return (
    <div className='MetricTop'>
      <TotalCard title={'Total Usuarios'} count={totalUser} />
      <TotalCard title={'Total Coches'} count={totalCar} />
      <StickCard catA={'Nuevos'} catB={'Usados'} countA={news} countB={used} catC={'Caja Automática'} catD={'Caja Manual'} countC={manual} countD={automatic}/>
      <BarVCard fuel={fuel} />
    </div>
  )
}
export default MetricTop;