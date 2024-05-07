'use Client';

import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
// Create a GlobalContext to share global state between components
const GlobalContext = createContext();
// Create a GlobalContextUpdate to update GlobalContext
const GlobalContextUpdate = createContext();
// Export the GlobalContextProvider component
export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});

  const [airQuality, setAirQuality] = useState({});

  const fetchForecast = async (city) => {
    try {
      const res = await axios.get('api/weather');

      setForecast(res.data);
    } catch (error) {
      console.log('Error fetching forecast data', error.message);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const res = await axios.get('api/pollution');
      setAirQuality(res.data);
    } catch (error) {
      console.log('Error fetching air quality data', error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
      }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Export the useGlobalContext function to access GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
// Export the useGlobalContextUpdate function to update GlobalContext
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
