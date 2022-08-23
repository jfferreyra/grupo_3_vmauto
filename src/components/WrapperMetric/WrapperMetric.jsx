import React from 'react';
import './WrapperMetric.css';
import MetricTop from '../MetricTop/MetricTop';
import MetricBtm from '../MetricBtm/MetricBtm';

function WrapperMetric(){
  return (
    <div className="WrapperMetric">
      <MetricTop />
      <MetricBtm />
    </div>
  )
}
export default WrapperMetric;