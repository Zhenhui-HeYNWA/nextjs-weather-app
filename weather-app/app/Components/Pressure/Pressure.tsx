'use client';
import { useGlobalContext } from '@/app/context/globalContext';
import { gauge } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useState } from 'react';
import { PressureChart } from './PressureChart/PressureChart';

function Pressure() {
  const { forecast } = useGlobalContext();
  const pressure = forecast?.main?.pressure || 990;
  if (!forecast || !forecast?.main?.pressure) {
    return <Skeleton className='h-12[rem] w-full' />;
  }

  return (
    <div className='pt-4 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>{gauge}Pressure</h2>

        <div className='w-full mt-4 '>
          <PressureChart value={pressure} />
        </div>
      </div>
    </div>
  );
}

export default Pressure;
