'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow, thunder } from '@/app/utils/Icons';
import moment from 'moment';

function Temperature() {
  const {forecast} = useGlobalContext();
  const {main ,timezone, name, weather} = forecast;
  console.log(main);
  console.log(name);
  
  if(!forecast || ! weather){
    return <div>Loading...</div>
  }
  const temp  = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  

  //state for current time 
  const [localTime , setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  // This code snippet is used to get the weather information from a given location.
const {main: weatherMain, description} = weather[0] 

  // This function is used to get the icon corresponding to the weather main and description.
  const getIcon = ()=>{
    // This switch statement is used to match the weather main and description and return the corresponding icon.
    switch(weatherMain){
      case ' Drizzle':
        return drizzleIcon;
      case 'Rani':
        return rain;
      case'Snow':
        return snow;
      case'Clear':
        return clearSky;
      case'Clouds':
        return cloudy;
      case'Thunderstorm':
        return thunder;
      default:
        return clearSky    

    }
  }
  //useEffect hook to get current time update
  useEffect(()=>{
    const interval = setInterval(()=>{
      const localMoment = moment().utcOffset(timezone/60);
      // custom format : 24 hours 
      const formatTime = localMoment.format('HH:mm');
      // day of the week 
      const day = localMoment.format('dddd');

      setLocalTime(formatTime);
      setCurrentDay(day);
    },1000)
  },[])
  
  return (
    <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col 
    justify-between dark:bg-dark-grey shadow-sm  dark:shadow-none
    '> 
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
        <p className='flex items-center gap-2'>
          <span>Low: {minTemp}°</span>
          <span>Heigh: {maxTemp}°</span>
        </p>
      </div>
    </div>
  )
}

export default Temperature
