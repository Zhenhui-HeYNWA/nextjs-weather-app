'use client';
import React from 'react';
import { useGlobalContext } from '@/app/context/globalContext';
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
  thunder,
  mist,
} from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import moment from 'moment';
import { kelvinToCelsius } from '@/app/utils/misc';

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();
  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return (
      <Skeleton className='h-[12rem] w-full  col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2' />
    );
  }
  if (!forecast || !weather) {
    return (
      <Skeleton className='h-[12rem] w-full  col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2' />
    );
  }

  const localMoment = moment().utcOffset(forecast?.timezone / 60);
  const dayTime = localMoment.format('YYYY-MM-DD hh:00:00');
  const trmTime = localMoment.add(24, 'hours');
  const formatTrm = trmTime.format('YYYY-MM-DD hh:ss:00');

  //filter the list for today's forecast
  const dailyForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return (
        moment(forecast.dt_txt).isAfter(dayTime) &&
        moment(forecast.dt_txt).isBefore(formatTrm)
      );
    }
  );

  if (dailyForecast.length < 1) {
    return (
      <Skeleton className='h-[12rem] w-full  col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2' />
    );
  }

  const { main: weatherMain } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
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
      case 'Atmosphere':
        return mist;
      default:
        return clearSky;
    }
  };
  return (
    <div
      className='pt-4 px-4 h-[12rem] border rounded-lg flex flex-col
    gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2 hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <div className='h-full flex gap-10 overflow-hidden'>
        {dailyForecast.length < 1 ? (
          <div className='flex justify-center items-center '>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className='w-full'>
            <Carousel>
              <CarouselContent>
                {dailyForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className='flex flex-col gap-8 md:gap-5 mx-4 basis-[8.5rem] cursor-grab justify-center items-center'>
                        <p className='text-gray-300'>
                          {moment(forecast.dt_txt).format('HH:mm')}
                        </p>
                        <p>{getIcon()}</p>
                        <p className='mt-4'>
                          {kelvinToCelsius(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
