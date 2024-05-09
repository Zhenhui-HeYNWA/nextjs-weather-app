'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { thermometer } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import { kelvinToCelsius } from '@/app/utils/misc';

function FeelsLike() {
  const {forecast} = useGlobalContext();
  if(!forecast || !forecast?.main || !forecast?.main?.feels_like ){
    return <Skeleton  className='h-[12rem] w-full'/>
  }
  const {feels_like, temp_min,temp_max}=forecast?.main;
  const feelsLikeText=(
    feelsLike:number,
    minTemp:number,
    maxTemp:number
  )=>{
    const avgTemp = (minTemp + maxTemp) / 2;
    if(feelsLike < avgTemp -5){
      return 'Feels significantly colder than actual temperature.';
    }if(feelsLike > avgTemp -5 && feelsLike <= avgTemp +5){
      return 'Feels colder than actual temperature.';
    }if(feelsLike > avgTemp +5){
      return 'Feels significantly warmer than actual temperature.';
    }
    return 'Temperature feeling is typical for this range.'
  }

  const feelsLike = forecast?.main.feels_like;
  
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {thermometer} Feels Like

        </h2>
        <p className='pt-4 text-2xl'>
          {kelvinToCelsius(feelsLike)}°
        </p>
      </div>
      <p>{feelsLikeText(feelsLike,temp_min,temp_max)}</p>
      </div>
  )
}

export default FeelsLike