import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ColorContext = createContext();

export const useColor = () => {
  return useContext(ColorContext);
};

export const ColorProvider = ({ children }) => {
  const [mainColor, setMainColor] = useState('#FFA500'); // Initial main color

  useEffect(() => {
    // Perform any asynchronous operations here
    const fetchMainColor = async () => {
      try {
        const appColor = await AsyncStorage.getItem("appColor");
        if (appColor) {
        console.log("APP COLOR", appColor);
          // Set the retrieved color from AsyncStorage as the initial state of mainColor
          setMainColor(appColor);
        }
      } catch (error) {
        console.error("Error fetching main color:", error);
      }
    };

    fetchMainColor();
  }, []); // Run only once on component mount

  const getColor = (value) => {
    setMainColor(value);
  };

  const palette = {
    // Your palette colors
    primary500: mainColor,
    // Other palette colors
  };

  const colorsProvider = {
    // Your color definitions
    palette,
    // Other color definitions
  };

  return (
    <ColorContext.Provider value={{ colorsProvider, getColor }}>
      {children}
    </ColorContext.Provider>
  );
};
