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

export default function Home() {
  return (
    <main
      className='mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem]
    m-auto'>
      <Navbar />
      <div className='pb-4 flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]'>
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className='flex flex-col w-full'>
          <div className='instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:gird-cols-3 xl:grid-cols-4'>
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
          <div className='mapbox-con mt-4 flex  w-full gap-x-3'>
            <Map />
            <div className='states flex flex-col gap-3 flex-1 '>
              <h2 className='flex items-center gap-2 font-medium'>
                Top Large Cities
              </h2>
              <div className='flex flex-col gap-4'>
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className='border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none'>
                      <p className='px-6 py-4'>{state.name}</p>
                    </div>
                  );
                })}
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
