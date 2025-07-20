"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Home() {
  const [location, setLocation] = useState("");
  const [center, setCenter] = useState({ lat: 12.9716, lng: 77.5946 }); 
  const [markers] = useState([
    { lat: 28.6139, lng: 77.209 },
    { lat: 28.6448, lng: 77.2167 },
  ]);
  const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Update map center
        setCenter({ lat, lng });

        // Optionally use reverse geocoding if you want to show city name
        setLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Could not fetch your location. Please allow location access.');
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};

  return (
<main style={{ padding: "2rem", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
  <h1 style={{ fontSize: "2rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
    ♻️ Community Recycling Map
  </h1>
  <p style={{ color: "#4b5563", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
    Find drop-off points for recycling in your area.
  </p>

  <div className="input-group">
    <input
      type="text"
      placeholder="Enter your location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="location-input"
    />
    <button
      onClick={getUserLocation}
      className="location-button"
    >
      📍 Use My Location
    </button>
  </div>

  <Map center={center} zoom={12} markers={markers} />
</main>


  );
}
