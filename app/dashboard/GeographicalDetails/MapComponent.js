"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet to prevent SSR errors
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const MapComponent = ({ selectedProject }) => {
  const [L, setL] = useState(null);

  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      setL(leaflet);
    })();
  }, []);

  if (!L) return <p>Loading map...</p>;

  // ✅ Load the selected project’s location (or default to Bungoma County)
  const position = selectedProject
    ? [selectedProject.latitude, selectedProject.longitude]
    : [0.5695, 34.5584];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        icon={new L.Icon({
          iconUrl: "/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      >
        <Popup>
          <strong>{selectedProject?.name || "Default Project"}</strong><br />
          Latitude: {position[0]}, Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
