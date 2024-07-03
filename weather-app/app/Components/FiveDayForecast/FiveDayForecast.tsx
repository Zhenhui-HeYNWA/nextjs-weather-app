'use client';
import { useGlobalContext } from '@/app/context/globalContext';
import { calender } from '@/app/utils/Icons';
import { kelvinToCelsius, unixToDate } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
  thunder,
  mist,
} from '@/app/utils/Icons';

function FiveDayForecast() {
  const { fiveDayForecast } = useGlobalContext();

  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  const processData = (
    dailyData: {
      main: {
        temp_min: number;
        temp_max: number;
      };
      weather: [
        {
          main: string;
        }
      ];
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: {
        main: {
          temp_min: number;
          temp_max: number;
        };
        weather: [
          {
            main: string;
          }
        ];
        dt: number;
      }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDate(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
      weather: dailyData[0].weather[0].main,
    };
  };
  const dailyForecast = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    dailyForecast.push(processData(dailyData));
  }

  const getIcon = (weatherType: string) => {
    switch (weatherType) {
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
      className='pt-4 pb-4 px-4 flex-1 border rounded-lg flex flex-col justify-between
    dark:bg-dark-grey shadow-sm dark:shadow-none '>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium '>
          {calender} 5-Day Forecast for {city.name}
        </h2>
        <div className='forecast-list pt-1 '>
          {dailyForecast.map((forecast, i) => {
            return (
              <div
                key={i}
                className='daily-forecast py-2  mt-3 flex flex-col justify-evenly
            border-t-2 '>
                <div className='flex justify-between items-center py-2'>
                  <p className='text-2xl min-w-[3.5rem]'>{forecast.day}</p>
                  <span>{getIcon(forecast.weather)}</span>
                </div>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='text-lg text-slate-400	 '>{forecast.minTemp}°</p>
                  <div className='temperature flex-1 w-full h-2 rounded-lg'></div>
                  <p>{forecast.maxTemp}°</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiveDayForecast;
