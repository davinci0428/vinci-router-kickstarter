import React, { useState, useEffect, Fragment } from 'react';
import { NavBottom } from './components.js';
import { PageOne, You } from './subpages.js';
import { useVinciRouter, useEventListener, useWrapper, useScreenResizer, usePathSegments, usePageTransitions, goHome  } from '../vinciToolbox';
import './Home.css';

const Home=(props)=> {
  let screen = useScreenResizer(); // Sets up screen resize listener and returns with and height of screen
  let wrapper = useWrapper(700, 'auto', screen.size); // Maintains main page wrapper and sets its max width and  max height
  let rt = useVinciRouter(); // Sets up the router and url listener for the entire app
  useEffect(()=> {
    setTimeout(()=> rt.nav('/'),1000 ); // Initializes the router
  },[])
  return (
    <Fragment>
      <div className="Home-background"></div>
      <div className="Home-main-wrapper"  style={{left: (screen.size.width/2)-wrapper.width/2}}>
        <div style={wrapper.style} >    
          <NavBottom rt={rt} maxWidth={300} wrapperWidth={wrapper.width} screenSize={screen.size} />
          <PageOne rt={rt} screenSize={screen.size} />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
