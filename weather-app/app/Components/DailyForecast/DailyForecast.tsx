'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { clearSky, cloudy, drizzleIcon, rain, snow, thunder } from '@/app/utils/Icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React from 'react'

function DailyForecast() {
  const {forecast,fiveDayForecast} = useGlobalContext();
  const {weather}=forecast;
  const {city ,list }=fiveDayForecast;
  if(!fiveDayForecast || !city || !list){
    return <Skeleton className='h-[12rem] w-full'/>
  }
  if(!forecast || !weather){
    return <Skeleton className='h-[12rem] w-full'/>
  }
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const todaysForecast = list.filter((forecast:{dt_txt:string; main:{temp:number}}) => {
    return forecast.dt_txt.startsWith(todayString)
  });

  console.log(todaysForecast);
  

  const {main: weatherMain} = weather[0]

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
    <div  className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col
    gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'
    >
      <div className='h-full flex gap-10 overflow-hidden'>
       {todaysForecast.length < 1? 
       (<div>Loading...</div>):(
        <div className='w-full'>
          <Carousel>
            <CarouselContent>
              {
                todaysForecast.map(
                  (forecast:{dt_txt:string,main:{temp:number}})=>{
                    return(
                      
                      <CarouselItem key={forecast.dt_txt}
                      className='flex flex-col gap-4 basis-[8.5rem] cursor-grab'>
                      <p className='text-gray-300'>
                        {moment(forecast.dt_txt).format('HH:mm')}
                      </p>
                      <p>{getIcon()}</p>
                      <p className='mt-4'>{kelvinToCelsius(forecast.main.temp)}°C</p>
 
                  </CarouselItem>
                
                    )
                  }
                )
              }
            </CarouselContent>
          </Carousel>
        </div>
       )}
      </div>
    </div>
  )
}

export default DailyForecast