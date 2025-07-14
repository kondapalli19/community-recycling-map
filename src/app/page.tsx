'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  const [center] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi
  const [markers] = useState([
    { lat: 28.6139, lng: 77.2090 },
    { lat: 28.6448, lng: 77.2167 },
  ]);

  return (
    <main style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem' }}>♻️ Community Recycling Map</h1>
      <p>Find drop-off points for recycling in your area.</p>
      <Map center={center} zoom={12} markers={markers} />
    </main>
  );
}
