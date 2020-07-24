import React, { useState, useEffect, Fragment } from 'react';
import { useVinciRouter, useEventListener, screenResizeHandler, usePathSegments, goHome  } from './vinciToolbox';
import Home from './Home/Home'
import './App.css';

function App() {
  let r = useVinciRouter();
  return (
    <Fragment>
      <Home />
    </Fragment>
  );
}

export default App;
