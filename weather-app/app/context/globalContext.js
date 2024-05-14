'use Client';

import axios from 'axios';
import React, { useContext, createContext, useState, useEffect } from 'react';
import defaultStates from '../utils/defaultStates';
import { debounce } from 'lodash';

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState('');
  const [activeCityCoords, setActiveCityCoords] = useState([-37.814, 144.9633]);
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log('Error fetching forecast data', error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log('Error fetching air quality data', error.message);
    }
  };

  const fetchFiveDayData = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fivedays?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log('Error fetching five day forecast data', error.message);
    }
  };

  const fetchGeoCodedList = async (search) => {
    console.log('search', search);

    try {
      const res = await axios.get(`api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log('Error fetching geoCoded list:', error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.log('Error fetching uv index data', error.message);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === '') {
      setGeoCodedList(defaultStates);
    }
  };

  console.log('Fetching with coords:', activeCityCoords);
  //debounce feature
  useEffect(() => {
    const debounceFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 200);
    if (inputValue) {
      debounceFetch(inputValue);
    }
    //cleanup
    return () => debounceFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayData(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    fetchGeoCodedList('london');
  }, [activeCityCoords]);
  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}>
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Export the useGlobalContext function to access GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
// Export the useGlobalContextUpdate function to update GlobalContext
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
