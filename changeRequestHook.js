import { useState, useEffect } from 'react';
import axios from 'axios';

export function changeRequestHook(widget) {
  const [clickedElement, setClickedElement] = useState(null);
  const [clickedTime, setClickedTime] = useState(null);

  useEffect(() => {
    function handleClick(event) {
      if (event.target.getAttribute('id')) {
        var element = event.target.getAttribute('id');
      } else {
        var element = event.target.getAttribute('class');
      }
      // set clicked div and time of click
      setClickedElement(element);
      setClickedTime(new Date().toString());
    }

    // listen for a click in the document
    document.addEventListener('click', handleClick);

    return () => {
      // remove event listener after click occurs
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    // if state updates and click sets element and time, show values and send to API
    if (clickedElement && clickedTime) {
      axios.post('/interactions', {
        params: {
          element: clickedElement,
          widget,
          time: clickedTime,
        },
      })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [clickedElement, clickedTime]);

  return [clickedElement, clickedTime];
}
