import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import { usePageTransitions, goHome } from '../vinciToolbox';
import { vinciContext } from '../App';

export const PageOne = (props)=> {
  let vinci = useContext(vinciContext);
  let pt = usePageTransitions('/one', 1)
  
  let transition = useSpring({
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    transform: `translateY(${pt.animate ? 0 : vinci.screen.size.height}px)`,
    background: '#555',
    display: pt.render ? 'block' : 'none',
  });
  
  return(
    <Fragment>
      <animated.div style={transition}>
        <div style={{width: vinci.wrapper.width, margin: '0 auto', border: '1px dotted white'}}>
        <div onClick={()=> window.history.go(-1)} >GO BACK</div>
          <h1>Montserat Font</h1>
          <button onClick={()=> vinci.rt.nav('/one/you')}>you</button>
        </div>
      </animated.div>
      <You />
    </Fragment>
  )
}

export const You = (props)=> {
  let pt = usePageTransitions('/you', 2);

  let vinci = useContext(vinciContext);

  let transition = useSpring({
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    transform: `translateX(${pt.animate ? 0 : vinci.screen.size.width}px)`,
    border: '1px dashed yellow'
  });
  let path = window.location.pathname
  return(
    <Fragment>
      {pt.render ?
        <animated.div style={transition}>
        <div onClick={()=> window.history.go(-1)} >GO BACK</div>
        </animated.div>
      : ''
      }
    </Fragment>
  )
}