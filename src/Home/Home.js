import React, { useState, useEffect, Fragment, createContext, useContext } from 'react';
import { PageOne, PageTwo } from './subpages.js';
import { useVinciRouter, useWrapper, useScreenResizer, usePathSegments, usePageTransitions, goHome  } from '../vinciToolbox';
import { vinciContext }  from '../App';
import { storeContext }  from '../App';

import './Home.css';



const Home=(props)=> {
  let screen = useScreenResizer(); // Sets up screen resize listener and returns with and height of screen
  let wrapper = useWrapper(1200, '100vh', screen.size); // Maintains main page wrapper and sets its max width and  max height
  let rt = useVinciRouter(); // Sets up the router and url listener for the entire app

  const vinci = useContext(vinciContext);
  vinci['screen'] = screen;
  vinci['wrapper'] = wrapper;
  vinci['rt'] = rt;

  const initializeRouter = () => {
    rt.nav('/');
  }

  let data = useContext(storeContext);
  // console.log('Home - data=', data);

  return (
    <div onLoad={initializeRouter}>
      <div className="Home-background"></div>
      <div className="Home-main-wrapper"  style={{left: (screen.size.width/2)-wrapper.width/2}}>
        <div style={wrapper.style} >    
          <button style={{cursor: 'pointer'}} onClick={() => rt.nav('/one')}>Open page one</button>
        </div>
      </div>
      <PageOne />
      <PageTwo />
    </div>
  );
}

export default Home;
