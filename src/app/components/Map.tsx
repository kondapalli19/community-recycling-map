'use client';

import { useEffect, useRef } from 'react';

type LatLngLiteral = {
  lat: number;
  lng: number;
};

type MapProps = {
  center: LatLngLiteral;
  zoom: number;
  markers: LatLngLiteral[];
};

export default function Map({ center, zoom, markers }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;
  
    const google = (window as any).google; 
  
    if (!google) return;
  
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
  
    markers.forEach((position) => {
      new google.maps.Marker({
        position,
        map,
      });
    });
  }, [center, zoom, markers]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}
