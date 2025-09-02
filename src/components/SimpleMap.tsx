import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const SimpleMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => (
  <MapContainer
    center={[latitude, longitude]}
    zoom={13}
    style={{ height: '400px', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[latitude, longitude]}>
      <Popup>Your Location</Popup>
    </Marker>
  </MapContainer>
);
