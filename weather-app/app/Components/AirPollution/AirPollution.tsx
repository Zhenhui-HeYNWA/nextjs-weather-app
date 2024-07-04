'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { thermo, good, bad } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { airQualityIndexText } from '@/app/utils/misc';

import React from 'react';

function AirPollution() {
  const { airQuality } = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full' />
    );
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className='air-pollution pt-4 pb-4 px-4 h-[12rem] border rounded-lg flex flex-col
        gap-10 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2 hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <h2 className='flex items-center gap-2 font-medium'>
        {thermo}Air Quality
      </h2>
      <div className='flex flex-row gap-4 items-center justify-between mt-4'>
        {good}
        <Progress value={airQualityIndex} max={100} className='progress' />
        {bad}
      </div>

      <p>Air quality is {filteredIndex?.description}</p>
    </div>
  );
}

export default AirPollution;
