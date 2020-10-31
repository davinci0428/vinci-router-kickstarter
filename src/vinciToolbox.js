import React, { useState, useRef, useEffect } from 'react';

/******** MY CUSTOM HOOKS *******/

// Returns an array that holds the URL paramaters, after the domain name */
export const usePathSegments=()=> {
  let p = window.location.pathname.split('/');
  for(let n=0; n<p.length; ++n){
    p[n] = '/' + p[n];
  }
  return p;
}

// A Hook for adding event listeners. An article about his custom hook is here: https://usehooks.com/useEventListener/
export const useEventListener=(eventName, handler, element = window)=> {
  // Create a ref that stores handler
  const savedHandler = useRef();  
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(()=> {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(()=> {
      // Make sure element supports addEventListener
      // On 
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

// A hook for key events
export const useKey=(key)=> {
  // Keep track of key state
  const [pressed, setPressed] = useState(false)
  // Does an event match the key we're watching?
  const match = event => key.toLowerCase() == event.key.toLowerCase()
  // Event handlers
  const onDown = event => {
      if (match(event)) setPressed(true)
  }
  const onUp = event => {
      if (match(event)) setPressed(false)
  }
  // Bind and unbind events
  useEffect(() => {
      window.addEventListener("keydown", onDown)
      window.addEventListener("keyup", onUp)
      return () => {
          window.removeEventListener("keydown", onDown)
          window.removeEventListener("keyup", onUp)
      }
  }, [key])
  return pressed
}

export const useVinciRouter = () => {
  let [url, setUrl] = useState('');

  let segment = window.location.pathname.split('/');
  for(let n=0; n<segment.length; ++n){
    segment[n] = '/' + segment[n];
  }
  
  let p = '';
  useEffect(()=> {
    p = window.location.pathname.split('/');
    for(let n=0; n<p.length; ++n){
      p[n] = '/' + p[n];
    }
    setUrl(p)
  },[]);

  window.onpopstate = (e) => {
    if(e.state) {
      setUrl(e.state.url)
    }else{
      setUrl('')
    }
  };

  const navigate = (url) => {
    //console.log('url:', url)
    //console.log('window.location.pathname:', window.location.pathname)
    if(url != window.location.pathname){
      window.history.pushState({url: url}, '', url);
    }else{console.log('blocks same URL')}
    setUrl(url);
  }
  return {url: url, setUrl: setUrl, seg: segment, nav: navigate}
}

export const usePageTransitions=(thisPage, segmentNumber)=> {
  let [prev, setPrev] = useState('');
  let [render, setRender] = useState(false);
  let [animate, setAnimate] = useState(false);

  let segments = usePathSegments();
  let seg = segments[segmentNumber];

  // Strip off and ignore data parameter in seg. The data parameter is immediately after a colon
  let segSplit = seg ? seg.split(':') : '';
  seg = segSplit[0];

  useEffect(()=>{
    if( seg=== thisPage && prev != thisPage){
      // console.log('--->>entering ' + thisPage)
      setRender(true);
      setAnimate(true);
      setPrev(thisPage);
    }
    if( seg != thisPage && prev === thisPage ){
      setAnimate(false);
      setTimeout(()=> { 
        setRender(false);
        // console.log(thisPage + ' is gone.') 
      }, 1000);
      setPrev('');
      // console.log('<<---exiting ' + thisPage)
    }
  },[seg]);
  return({render: render, animate: animate});
}

export const useComponentTransitions=(thisPage, segmentNumber)=> {
  let [prev, setPrev] = useState('');
  let [render, setRender] = useState(false);
  let [animate, setAnimate] = useState(false);

  let segments = usePathSegments();
  let seg = segments[segmentNumber];

  useEffect(()=>{
    if( seg=== thisPage && prev != thisPage){
      console.log('--->>entering ' + thisPage)
      setRender(true);
      setAnimate(true);     
      setPrev(thisPage);
    }
    if( seg != thisPage && prev === thisPage ){
      setAnimate(false);
      setTimeout(()=> { setRender(false); console.log(thisPage + ' is gone.') }, 1500);
      setPrev('');
      console.log('<<---exiting ' + thisPage)
    }
  },[seg]);
  return({render: render, animate: animate});
}

// Set up the main page wrapper and its maxWith and height
export const useWrapper=(wrapperWidth, wrapperHeight, screenSize)=> {
  if(wrapperWidth > screenSize.width){
    wrapperWidth = screenSize.width;
  }
  let wrapperStyle = {
    width: wrapperWidth,
    height: wrapperHeight,
    overflow: 'hidden'
  }
  //console.log(`wrapperWidth: ${wrapperWidth} -- screenSize.width: ${screenSize.width}`)
  return {width: wrapperWidth, style: wrapperStyle}
}

export const useScreenResizer=()=> {
  // State for storing viewsceen size, used by resize event listener below
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  function screenResizeHandler(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
    setScreenSize({ width: x, height: y });
  }

  // Add event listener using our custom hook found in the /app_suite/common.js file
  useEventListener('orientationchange', screenResizeHandler);
  useEventListener('resize', screenResizeHandler);
  useEffect(()=> {
    screenResizeHandler();  // Initialize width and height
    
  },[]);
  return {size: screenSize, setSize: setScreenSize}
}


/********* Miscellaneous function ********/

export const goHome=()=> {
  console.log('window.history.length: ', window.history.length)
  window.history.go(-(window.history.length-2));
}