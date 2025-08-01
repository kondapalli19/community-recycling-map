"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function LocationSearch() {

  type DWCCMarker = {
    lat: number;
    lng: number;
    name: string;
    address: string;
    contact: string;
  };

  const [location, setLocation] = useState("");
  const [center, setCenter] = useState({ lat: 12.9716, lng: 77.5946 });
  const [selectedDWCC, setSelectedDWCC] = useState<DWCCMarker | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCombinedModal, setShowCombinedModal] = useState(false);
  const [dwccAvailable, setDwccAvailable] = useState(false);
  const [kabadiwalaShown, setKabadiwalaShown] = useState(false);

  const kabadiwalaList = [
    // Example kabadiwala list
    {
      name: "Raj Kabadiwala",
      contact: "9876543210",
      location: "BTM Layout, Bengaluru",
    },
    {
      name: "Eco Recycler",
      contact: "8123456789",
      location: "Jayanagar, Bengaluru",
    },
  ];

  const dwccMarkers: DWCCMarker[] = [
    {
      lat: 12.9716,
      lng: 77.5946,
      name: "DWCC Center 1",
      address: "Some address",
      contact: "9876543210",
    },
    {
      lat: 12.2958,
      lng: 76.6394,
      name: "DWCC Center 2",
      address: "Another address",
      contact: "8765432109",
    },

  ];


  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userLocation = { lat, lng };

          setCenter(userLocation);
          setLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);

          const nearbyDWCC = dwccMarkers.find((dwcc) => {
            const distance = getDistanceFromLatLngInKm(lat, lng, dwcc.lat, dwcc.lng);
            return distance <= 5;
          });

          if (nearbyDWCC) {
            setDwccAvailable(true);
            setSelectedDWCC(nearbyDWCC);
            setShowModal(true); // ✅ Show DWCC modal
            setShowCombinedModal(false); // ✅ Ensure fallback modal is hidden
          } else {
            setDwccAvailable(false);
            setSelectedDWCC(null); // ✅ Clear previous DWCC
            setShowCombinedModal(true); // ✅ Show fallback modal
            setShowModal(false); // ✅ Ensure DWCC modal is hidden
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  // Utility function to calculate distance between two coordinates (Haversine formula)
  const getDistanceFromLatLngInKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);


  const handleMarkerClick = (location: google.maps.LatLngLiteral) => {
    const matchedMarker = dwccMarkers.find(
      (marker) =>
        Math.abs(marker.lat - location.lat) < 0.0001 &&
        Math.abs(marker.lng - location.lng) < 0.0001
    );

    if (matchedMarker) {
      setSelectedDWCC(matchedMarker);
      setShowModal(true);
    } else {
      console.warn("No DWCC found for clicked location", location);
    }
  };



  return (
    <>
      <main style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }} id="drop-off">
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "2rem",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Left Panel */}
          <div style={{ maxWidth: "45%", color: "#fff", marginTop: "7rem", marginLeft: "2rem" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "green" }}>
              Every Small Step Counts — Find a Recycling Spot Near You
            </h1>
            <p style={{ fontSize: "1.25rem", marginBottom: "1.5rem", color: "green" }}>
              Find drop-off points for recycling in your area.
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  flexGrow: 1,
                  width: "250px",
                  color: "black"
                }}
              />
              <button
                onClick={getUserLocation}
                style={{
                  backgroundColor: "#22c55e",
                  border: "none",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                📍 Use My Location
              </button>
            </div>
          </div>

          {/* Right: Map */}
          <div style={{ width: "50%", height: "100%" }}>
            <Map center={center} zoom={12} markers={dwccMarkers} onMarkerClick={handleMarkerClick} />
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedDWCC && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "1.5rem", color: "#22c55e", marginBottom: "1rem" }}>
              🏢 Dry Waste Collection Centre (DWCC)
            </h2>
            <p><strong>Name:</strong> Dry Waste Collection Center </p>
            <p><strong>Address:</strong> Milk Booth, Jeewan Griha Colony, 2nd Phase, J. P. Nagar, Bengaluru, Karnataka 560078 </p>
            <p><strong>Contact:</strong> 09008700371 </p>
            <p><strong>Pickup Available: </strong> YES</p>

            <button
              style={{
                marginTop: "1.5rem",
                backgroundColor: "#22c55e",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "1rem",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showCombinedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-center text-green-700">♻️ Waste Collection Info</h2>

            {dwccAvailable ? (
              <div>
                <p className="text-gray-800">DWCC is available in your area.</p>
                <p><strong>Name:</strong> Eco Waste Center</p>
                <p><strong>Address:</strong> 123 Main St, Bengaluru</p>
              </div>
            ) : (
              <div>
                <p className="text-red-600 font-semibold">
                  ⚠️ No DWCC available in your area.
                </p>

                {!kabadiwalaShown ? (
                  <button
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 w-full"
                    onClick={() => setKabadiwalaShown(true)}
                  >
                    Show Kabadiwala Options
                  </button>
                ) : (
                  <>
                    {kabadiwalaList.length > 0 ? (
                      <ul className="space-y-2 text-gray-800">
                        {kabadiwalaList.map((k, index) => (
                          <li key={index} className="border-b pb-2">
                            <strong>Name:</strong> {k.name}<br />
                            <strong>Contact:</strong> {k.contact}<br />
                            <strong>Location:</strong> {k.location}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-yellow-600">
                        ⚠️ No Kabadiwala services found near your location.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
              onClick={() => setShowCombinedModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


    </>
  );
}