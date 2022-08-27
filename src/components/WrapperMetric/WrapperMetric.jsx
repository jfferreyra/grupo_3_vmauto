import React from 'react';
import './WrapperMetric.css';
import MetricTop from '../MetricTop/MetricTop';
import MetricBtm from '../MetricBtm/MetricBtm';
import { useState,useEffect} from 'react';

function WrapperMetric(){
  const [metrics,setMetrics]=useState([]); //Estado Metrics. Son los datos de las métricas.

  function getMetrics() {     // Metodo trae Métricas de coches.
    fetch('http://localhost:5001/api/metrics')
      .then(response=>response.json())
      .then(data => {
        setMetrics([
          data.totalUser,
          data.totalCar,
          data.category,
          data.condition,
          data.fuel,
          data.transmission,
          data.lastUser,
          data.lastCar,
        ]);
      })
      .catch(e=>{console.log(e);})
  }
  
  useEffect(()=>{   // Trae métricas luego del primer renderizado
    getMetrics();
	},[]);

  if(metrics.length===0){ //No renderiza hasta que metrics sea distinto a []
    return null
  }else{
    return (
      <div className="WrapperMetric">
        <MetricTop totalUser={metrics[0]} totalCar={metrics[1]} condition={metrics[3]} fuel={metrics[4]} transmission={metrics[5]}/>
        <MetricBtm categories={metrics[2]} lastUser={metrics[6]} lastCar={metrics[7]}/>
      </div>
    )
  }
}
export default WrapperMetric;