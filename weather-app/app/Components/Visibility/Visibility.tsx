'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { eye } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Visibility() {
  const {forecast} = useGlobalContext();
  const visibility = forecast?.visibility;

   if(!forecast || !forecast?.visibility){
    return <Skeleton className='h-[12rem] w-full'/>
   }
   const coverVisibility = visibility / 1000;
   const getVisibilityDescription = (coverVisibility:number)=>{
     if(visibility >10) return 'Excellent: Clear and vast view';
     if(visibility >5) return 'Good: Easily navigable';
     if(visibility >2) return 'Moderate: Some limitations';
     if(visibility <=2) return 'Poor: Restricted and unclear';
     return 'Unavailable: Visibility data not available';
   } 
  return (
    <div className='pt-4 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
    dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className='top'>
     <h2 className='flex items-center gap-2 font-medium'> {eye}Visibility</h2>
     <p className='pt-4 text-2xl'>
        {coverVisibility} km
        </p> 
     </div>
     <p>{getVisibilityDescription(coverVisibility)}</p>
      </div>
  )
}

export default Visibility