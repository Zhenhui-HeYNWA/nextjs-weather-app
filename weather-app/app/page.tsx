'use client';
import { useWindowContext } from '@/app/Providers/WindowContextProvider';
import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Temperature from './Components/Temperature/Temperature';
import AirPollution from './Components/AirPollution/AirPollution';
import Sunset from './Components/Sunset/Sunset';
import Wind from './Components/Wind/Wind';
import DailyForecast from './Components/DailyForecast/DailyForecast';
import UV from './Components/UV/UV';
import Population from './Components/Population/Population';
import FeelsLike from './Components/FeelsLike/FeelsLike';
import Humidity from './Components/Humidity/Humidity';
import Visibility from './Components/Visibility/Visibility';
import Pressure from './Components/Pressure/Pressure';
import Map from './Components/Mapbox/Mapbox';
import defaultStates from './utils/defaultStates';
import FiveDayForecast from './Components/FiveDayForecast/FiveDayForecast';
import { useGlobalContextUpdate } from './context/globalContext';

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const { width, height, isMobile } = useWindowContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [setActiveCityCoords]);

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <main className='mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className='pb-4 flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-col gap-4 w-full  md:w-[35rem]'>
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className='flex flex-col w-full'>
          <div className='instruments flex flex-col gap-4 h-full col-span-full  sm:flex sm:flex-col sm:gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UV />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className='mapbox-con mt-4 flex w-full gap-x-3'>
            <Map />
            <div className='states flex flex-col gap-3 flex-1'>
              <h2 className='flex items-center gap-2 font-medium'>
                Top Large Cities
              </h2>
              <div className='flex flex-col gap-4'>
                {defaultStates.map((state, index) => (
                  <div
                    key={index}
                    className='border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'
                    onClick={() => getClickedCityCords(state.lat, state.lon)}>
                    <p className='px-6 py-4'>{state.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='py-6 flex justify-center pb-8'>
        <p className='footer-text text-sm flex items-center gap-1'>
          Made by
          <a
            href='https://github.com/Zhenhui-HeYNWA'
            target='_blank'
            className='text-green-300 font-bold'>
            Herbert
          </a>
        </p>
      </footer>
    </main>
  );
}
