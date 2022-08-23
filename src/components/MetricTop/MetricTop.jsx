import React from 'react';
import './MetricTop.css';
import TotalCard from '../TotalCard/TotalCard';
import StickCard from '../StickCard/StickCard';
import BarVCard from '../BarVCard/BarVCard';
let {userTitle,userCount,carTitle,carCount}={userTitle:'Total Usuarios',userCount:325,carTitle:'Total Coches',carCount:2658}

function MetricTop(){
  return (
    <div className='MetricTop'>
      <TotalCard title={userTitle} count={userCount} />
      <TotalCard title={carTitle} count={carCount} />
      <StickCard catA={'Nuevos'} catB={'Usados'} countA={300} countB={700} catC={'Caja Manual'} catD={'Caja Automática'} countC={400} countD={600}/>
      <BarVCard />
    </div>
  )
}
export default MetricTop;