'use client';
import { useGlobalContext } from '@/app/context/globalContext';
import { sunsetLogo, sunriseLogo } from '@/app/utils/Icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DaylightChart from './DaylightChart';

function Sunset() {
  const { forecast } = useGlobalContext();
  const [isSunrise, setIsSunrise] = useState<Boolean>(false);
  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;
  const sunsetTime = unixToTime(times, timezone);
  const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(forecast?.timezone / 60);
      const formatTime = localMoment.format('HH:mm');
      if (moment(formatTime, 'HH:mm').isBefore(moment(sunriseTime, 'HH:mm'))) {
        setIsSunrise(true);
      } else {
        setIsSunrise(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [forecast?.timezone]);

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  return (
    <div className='pt-4 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <div className='top flex flex-row justify-between items-center text-center'>
        <h2 className='flex items-center gap-2 font-medium'>
          {sunriseLogo}Sunrise
        </h2>
        <p className=' text-lg '>{sunriseTime}</p>
      </div>

      <div className=' h-16'>
        <DaylightChart />
      </div>

      <div className='top  flex flex-row justify-between items-center text-center'>
        <h2 className='flex items-center gap-2 font-medium'>
          {sunsetLogo}Sunset
        </h2>
        <p className=' text-lg '>{sunsetTime}</p>
      </div>
    </div>
  );
}

export default Sunset;
