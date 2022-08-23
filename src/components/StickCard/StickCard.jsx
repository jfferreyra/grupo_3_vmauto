import React from 'react';
import './StickCard.css';

function StickCard(props){
  let{catA,catB,countA,countB,catC,catD,countC,countD}=props;
  let totalAB=countA+countB;
  let percentA=100*countA/totalAB;
  let percentB=100*countB/totalAB;
  let totalCD=countC+countD;
  let percentC=100*countC/totalCD;
  let percentD=100*countD/totalCD;
  let root=document.querySelector(':root');
  root.style.setProperty(`--stickA`,`${percentA}%`);
  root.style.setProperty(`--stickB`,`${percentB}%`);
  root.style.setProperty(`--stickC`,`${percentC}%`);
  root.style.setProperty(`--stickD`,`${percentD}%`);
  return (
    <>
      <div className='StickCard'>
        <div className="StickCard__a"><p className="StickCard__pCat">{catA}</p><p className="StickCard__pCount">{countA}</p></div>
        <div className="StickCard__b"><p className="StickCard__pCat">{catB}</p><p className="StickCard__pCount">{countB}</p></div>
      </div>
      <div className='StickCard'>
        <div className="StickCard__c"><p className="StickCard__pCat">{catC}</p><p className="StickCard__pCount">{countC}</p></div>
        <div className="StickCard__d"><p className="StickCard__pCat">{catD}</p><p className="StickCard__pCount">{countD}</p></div>
      </div>
    </>
  )
}
export default StickCard;