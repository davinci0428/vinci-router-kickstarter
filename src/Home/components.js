
import React, { useState, useEffect, Fragment } from 'react';

export const NavBottom=(props)=> {
  let maxW = props.maxWidth;
  let wrapperW = props.wrapperWidth;
  let appSize = props.screenSize
  let rt = props.rt;
  if(maxW > wrapperW-20){ // Adds left and right margin to this component
    maxW = wrapperW-20
  }

  return(
    <div className="Home-nav-bottom"
    style={{position: 'absolute', maxWidth: maxW, top: appSize.height-85, left: wrapperW/2 - maxW/2}}>
      <button onClick={()=>rt.nav('/one')}>Page One</button>
      <button onClick={()=>rt.nav('/two')}>Page Two</button>
      <button onClick={()=>rt.nav('/three')}>Page Three</button>
    </div>
  )
}