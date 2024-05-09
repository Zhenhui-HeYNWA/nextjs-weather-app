'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { sun } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import { Progress } from '../UvProgress/UvProgress';


function UV() {
  const {uvIndex} = useGlobalContext();
  if(!uvIndex ||!uvIndex.daily){
    return<Skeleton className='h-[12rem] w-full'/>
  }
  const {daily} = uvIndex;
  const {uv_index_clear_sky_max,uv_index_max}= daily
   
   const uvIndexMax = uv_index_max[0].toFixed(0);
   
   const uvIndexCategory = (uvIndex: number)=>{
    if(uvIndex <= 2){
      return{
        text:'Low',
        description:'NO protection required',
      };
    } else if(uvIndex <= 5){
      return{
        text:'Moderate',
        description:'Limited protection required',
      };
    }else if (uvIndex <= 7){
      return{
        text:'High',
        description:'Moderate protection required',
      };
    }else if (uvIndex <= 10){
      return{
        text:'Very High',
        description:'Heavy protection required',
      };
    }else{
      return{
        text:'Extreme',
    }
   }}
   const marginLeftPercentage = (uvIndexMax/14)*100;
   
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none">
    <div className="top">
      <h2 className="flex items-center gap-2 font-medium">{sun} Uv Index</h2>
      <div className="pt-4 flex flex-col gap-1">
        <p className="text-2xl">
          {uvIndexMax}
          <span className="text-sm">
            ({uvIndexCategory(uvIndexMax).text})
          </span>
        </p>

        <Progress
          value={marginLeftPercentage}
          max={14}
          className="progress"
        />
      </div>
    </div>

    <p className="text-sm">{uvIndexCategory(uvIndexMax).description} </p>
  </div>
  )
}

export default UV