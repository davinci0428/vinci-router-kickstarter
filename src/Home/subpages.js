import React, { useState, useEffect, Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import { usePageTransitions, goHome } from '../vinciToolbox';


export const PageOne = (props)=> {
  let pt = usePageTransitions('/one', 1)
  let transition = useSpring({
    transform: `translateY(${pt.animate ? 0 : props.screenSize.height+10}px)`,
  });
  let path = window.location.pathname;
  return(
    <Fragment>
      {pt.render ?
        <animated.div style={transition}>
          <h1>Montserat Font</h1>
          <button onClick={()=> props.rt.nav(path + '/you')}>you</button>
        </animated.div>
      : ''
      } 
      <You rt={props.rt} screenSize={props.screenSize} />
    </Fragment>
  )
}

export const You = (props)=> {
  let pt = usePageTransitions('/you', 2);

  console.log(' props.screenSize.height',  props.screenSize.width + 10)

  let transition = useSpring({
    transform: `translateX(${pt.animate ? 0 : props.screenSize.width + 10}px)`,
  });
  let path = window.location.pathname
  return(
    <Fragment>
      {pt.render ?
        <animated.div style={transition}>
          'You'
          <button onClick={()=> goHome()}>Go Home!</button>
        </animated.div>
      : ''
      }
    </Fragment>
  )
}