import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardHeight = (platforms = ['ios', 'android']) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const showSubscription = useRef(null);
  const hideSubscription = useRef(null);

  useEffect(() => {
    if (isEventRequired(platforms)) {
      showSubscription.current = Keyboard.addListener(
        'keyboardDidShow',
        keyboardDidShow
      );
      hideSubscription.current = Keyboard.addListener(
        'keyboardDidHide',
        keyboardDidHide
      );

      // cleanup function
      return () => {
        showSubscription.current?.remove();
        hideSubscription.current?.remove();
      };
    } else {
      return () => {};
    }
  }, []);

  const isEventRequired = (platforms) => {
    try {
      return (
        platforms?.map((p) => p?.toLowerCase()).indexOf(Platform.OS) !== -1 ||
        !platforms
      );
    } catch (ex) {
      // Damn
    }

    return false;
  };

  const keyboardDidShow = (frames) => {
    setKeyboardHeight(frames.endCoordinates.height);
  };

  const keyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  return keyboardHeight;
};

export default useKeyboardHeight;
