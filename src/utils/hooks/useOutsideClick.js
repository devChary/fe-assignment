import { useState, useEffect } from 'react';

function useOutsideClick(ref) {
  const [isClickedOutside, setClickedOutside] = useState(false);
  function onMouseDown(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setClickedOutside(true);
      return;
    }
    setClickedOutside(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  });

  return isClickedOutside;
}

export { useOutsideClick };
