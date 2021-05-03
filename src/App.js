import React, { createContext, useContext, Fragment } from 'react';
import { useVinciRouter, useEventListener, screenResizeHandler, usePathSegments, goHome  } from './vinciToolbox';
import Home from './Home/Home'
import './App.css';

export let vinciContext = createContext({});
export const storeContext = createContext({color: 'reddish'});

function App() {
  let r = useVinciRouter();
  return (
    <Fragment>
      <Home />
    </Fragment>
  );
}

export default App;
