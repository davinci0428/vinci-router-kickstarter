import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import { usePageTransitions } from '../vinciToolbox';
import { vinciContext } from '../App';

export const PageOne = (props)=> {
  let vinci = useContext(vinciContext);
  let pt = usePageTransitions('/one', 1)
  
  let transition = useSpring({
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    transform: `translateY(${pt.animate ? 0 : vinci.screen.size.height}px)`,
    background: 'translate',
    display: pt.render ? 'block' : 'none',
  });
  
  return(
    <Fragment>
      <animated.div style={transition}>
        <div style={{
          width: vinci.wrapper.width, 
          height: '100vh',
          margin: '0 auto', 
          background: '#555',
          padding: 20,
          boxSizing: 'border-box',
          border: '1px dotted white'
        }}>
          <div style={{marginBottom: 100, cursor: 'pointer'}} onClick={()=> window.history.go(-1)} >CLOSE PAGE ONE</div>
          <button style={{cursor: 'pointer'}} onClick={()=> vinci.rt.nav('/one/two')}>Open page two</button>
        </div>
      </animated.div>
      <PageTwo />
    </Fragment>
  )
}

export const PageTwo = (props)=> {
  let pt = usePageTransitions('/two', 2);

  let vinci = useContext(vinciContext);

  let transition = useSpring({
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    transform: `translateX(${pt.animate ? 0 : vinci.screen.size.width}px)`,
    opacity: pt.render ? 1 : 0,
    display: pt.render ? 'block' : 'none',
    // border: '1px dashed yellow'
  });
  let path = window.location.pathname
  return(
    <Fragment>
      {pt.render ?
        <animated.div style={transition}>
          <div style={{
            width: vinci.wrapper.width, 
            height: '100vh',
            margin: '0 auto',
            padding: 20,
            background: '#f2f2f2',
            color: '#333',
          }}>
            <div style={{cursor: 'pointer'}} onClick={()=> window.history.go(-1)} >CLOSE PAGE TWO</div>
          </div>
        </animated.div>
      : ''
      }
    </Fragment>
  )
}