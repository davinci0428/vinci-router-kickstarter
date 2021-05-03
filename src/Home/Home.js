import React, { useState, useEffect, Fragment, useContext } from 'react';
import { NavBottom } from './components.js';
import { PageOne, You } from './subpages.js';
import { useVinciRouter, useWrapper, useScreenResizer, usePathSegments, usePageTransitions, goHome  } from '../vinciToolbox';
import { storeContext }  from '../App';
import './Home.css';

const Home=(props)=> {
  let screen = useScreenResizer(); // Sets up screen resize listener and returns with and height of screen
  let wrapper = useWrapper(900, '100vh', screen.size); // Maintains main page wrapper and sets its max width and  max height
  let rt = useVinciRouter(); // Sets up the router and url listener for the entire app

  let data = useContext(storeContext);
  console.log('data=', data);

  const initializeRouter = () => {
    rt.nav('/');
  }

  return (
    <div onLoad={initializeRouter}>
      <div className="Home-background"></div>
      <div className="Home-main-wrapper"  style={{left: (screen.size.width/2)-wrapper.width/2}}>
        <div style={wrapper.style} >    
          <PageOne rt={rt} screenSize={screen.size} />
        </div>
      </div>
    </div>
  );
}

export default Home;
