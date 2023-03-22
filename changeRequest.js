import { useState, useEffect } from 'react';

export function changeRequestHook(widget) {
  const [clickedElement, setClickedElement] = useState(null);
  const [clickedTime, setClickedTime] = useState(null);

  useEffect(() => {
    function handleClick(event) {
      if (event.target.getAttribute('id')) {
        var element = event.target.getAttribute('id');
      } else {
        var element = event.target.getAttribute('class')
      }
      //set clicked div and time of click
      setClickedElement(element);
      setClickedTime(new Date());
    }

    //listen for a click in the document
    document.addEventListener('click', handleClick);

    return () => {
      //remove event listener after click occurs
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    //if state updates and click sets element and time, show values and send to API
    if (clickedElement && clickedTime) {
      console.log(`Clicked ${clickedElement} in ${widget} at ${clickedTime}`);
    }
  }, [clickedElement, clickedTime]);

  return [clickedElement, clickedTime];
}
