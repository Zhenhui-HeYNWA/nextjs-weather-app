'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { thermo,good, bad } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from "@/components/ui/progress"
import {airQualityIndexText} from '@/app/utils/misc';

import React from 'react'

function AirPollution() {
  const {airQuality} = useGlobalContext();
  
  

  if(!airQuality || 
    !airQuality.list || 
    !airQuality.list[0]||
    !airQuality.list[0].main
  ){
    return(
      <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full'/>
    );
  }

  const airQualityIndex =  airQuality.list[0].main.aqi * 10;

  
  const filteredIndex = airQualityIndexText.find((item)=>{
    return item.rating === airQualityIndex;
  })
  

  return <div className='air-pollution col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col
        gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
        <h2 className='flex items-center gap-2 font-medium'>{thermo}Air Pollution</h2>
       <div className='flex flex-row gap-2 items-center justify-between'>
        {good}
       <Progress 
        value ={airQualityIndex} 
        max={100}
        className="progress"
        />
        {bad}

       </div>
        
        <p>Air quality is {filteredIndex?.description}</p>
    </div>
  
}

export default AirPollution
