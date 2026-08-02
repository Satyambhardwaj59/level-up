import { useState, useCallback } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prev => !prev);
  }, []);

  const setOn = useCallback(() => {
    setState(true);
  }, []);

  const setOff = useCallback(() => {
    setState(false);
  }, []);

  return {
    state,
    toggle,
    setOn,
    setOff,
  };
};

export default useToggle;