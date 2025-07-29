'use client';

import LocationSearch from './components/LocationSearch';


export default function Home() {
  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <LocationSearch />
    </main>
  );
}
