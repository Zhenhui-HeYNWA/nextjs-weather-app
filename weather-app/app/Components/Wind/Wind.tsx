'use client';
import { useGlobalContext } from '@/app/context/globalContext';
import { wind } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import Image from 'next/image';
import Compass from '@/components/ui/compass';

function Wind() {
  const { forecast } = useGlobalContext();

  const windSpeed: number = forecast?.wind?.speed;
  const windDir: number = forecast?.wind?.deg;
  const CompassProps = {
    deg: windDir,
  };

  if (!windSpeed || !windDir) {
    return <Skeleton className='h-[12em] w-full' />;
  }

  const getWindDirection = (deg: number) => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.floor(((deg + 11.25) % 360) / 22.5);
    return directions[index];
  };

  return (
    <div className=' p-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none md:hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <div className='flex flex-row justify-between items-center text-center'>
        <h2 className='flex items-center text-center gap-2 font-medium'>
          {wind} Wind
        </h2>
        <p className='text-lg'>{windSpeed}m/s</p>
      </div>
      <div className='compass relative flex  justify-center'>
        <div className='image relative mb-2'>{Compass(CompassProps)}</div>
      </div>
    </div>
  );
}

export default Wind;
