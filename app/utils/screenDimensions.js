import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenDimensions(window);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return screenDimensions;
};

export default useScreenDimensions;
