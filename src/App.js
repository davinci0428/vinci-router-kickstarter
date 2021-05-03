import React, { createContext, useContext, Fragment } from 'react';
import { useVinciRouter, useEventListener, screenResizeHandler, usePathSegments, goHome  } from './vinciToolbox';
import Home from './Home/Home'
import './App.css';

export const storeContext = createContext({color: 'red'});


function App() {
  let r = useVinciRouter();
  return (
    <Fragment>
      <Home />
    </Fragment>
  );
}

export default App;
