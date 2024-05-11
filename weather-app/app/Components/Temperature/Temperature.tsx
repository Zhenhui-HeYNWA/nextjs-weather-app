'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow, thunder } from '@/app/utils/Icons';
import moment from 'moment';

function Temperature() {
  const {forecast} = useGlobalContext();

  // state for current time 
  const [localTime , setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');
   
    
  // useEffect hook to get current time update
  useEffect(()=>{
    const interval = setInterval(()=>{
      const localMoment = moment().utcOffset(forecast?.timezone/60);
      const formatTime = localMoment.format('HH:mm');
      const day = localMoment.format('dddd');

      setLocalTime(formatTime);
      setCurrentDay(day);
    },1000)
    return () => clearInterval(interval);
  }, [forecast?.timezone])

  if(!forecast || !forecast.weather){
    return <div>Loading...</div>
  }

  const {main, name, weather} = forecast;
  const temp  = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);
  const {main: weatherMain, description} = weather[0];

  const getIcon = () => {
    switch(weatherMain){
      case 'Drizzle':
        return drizzleIcon;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      case 'Clear':
        return clearSky;
      case 'Clouds':
        return cloudy;
      case 'Thunderstorm':
        return thunder;
      default:
        return clearSky;    
    }
  }

  return (
    <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col 
    justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'> 
     <p className='flex justify-between items-center'>
      <span className=' font-medium'>{currentDay}</span>
      <span className=' font-medium'>{localTime}</span>
     </p>
     <p className=' pt-2 font-bold flex gap-1'>
      <span>{name}</span>
      <span>{navigation}</span>
      </p>
      <p className=' py-10 text-9xl font-bold self-center'>{temp}°</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
        </div>
        <div className=' justify-between'>
        <p className='flex items-center gap-2'>
          <span>L: {minTemp}°</span>
          <span>H: {maxTemp}°</span>
          
        </p>
        
        </div>
      </div>
    </div>
  )
}


export default Temperature
