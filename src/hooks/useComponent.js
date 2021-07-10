import React, { useEffect, useRef } from 'react';

export default function useComponent(Component, props) {
  const propsRef = useRef(props);
  propsRef.current = props;
  useEffect(() => {
    propsRef.current = null;
  }, []);
  return useRef(() => {
    const props = propsRef.current;
    if (props === null) {
      throw new Error(
        'The returned component must be rendered in the same renderer phase as the hook'
      );
    }
    return <Component {...props} />;
  }).current;
}
