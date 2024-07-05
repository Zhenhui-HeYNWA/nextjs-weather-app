'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalContext } from '@/app/context/globalContext';

interface ActiveCityCoords {
  lat: number;
  lon: number;
}

interface FlyToActiveCityProps {
  activeCityCords: ActiveCityCoords | null;
}

function FlyToActiveCity({ activeCityCords }: FlyToActiveCityProps) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      map.flyTo([activeCityCords.lat, activeCityCords.lon], 13, {
        duration: 1.5,
      });
    }
  }, [activeCityCords, map]);

  return null;
}

function Map() {
  const { forecast } = useGlobalContext();
  const activeCityCords = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className='flex-1 basis-[50%] border rounded-lg md:hover:scale-105 transition-all ease-in-out hover:shadow-xl hover:bg-gray-50'>
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className='rounded-lg m-4'
        style={{ height: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> contributors'
        />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Map;
