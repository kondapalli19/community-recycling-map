'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

type LatLngLiteral = google.maps.LatLngLiteral;

type MapProps = {
  center: LatLngLiteral;
  zoom: number;
  markers: LatLngLiteral[];
  onMarkerClick?: (position: LatLngLiteral) => void;
};

export default function Map({ center, zoom, markers, onMarkerClick }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      markers.forEach((position) => {
        const marker = new google.maps.Marker({
          position,
          map,
        });

        if (onMarkerClick) {
          marker.addListener('click', () => {
            onMarkerClick(position);
          });
        }
      });
    });
  }, [center, zoom, markers, onMarkerClick]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}
