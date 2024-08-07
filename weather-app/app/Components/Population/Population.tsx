'use client';
import { useGlobalContext } from '@/app/context/globalContext';
import { people } from '@/app/utils/Icons';
import { formatNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;
  if (!fiveDayForecast || !city) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  return (
    <div
      className='pt-4 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
    dark:bg-dark-grey shadow-sm dark:shadow-none md:hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {people} Population
        </h2>
        <p className='pt-4 text-2xl'>{formatNumber(city.population)}</p>
      </div>
    </div>
  );
}

export default Population;
