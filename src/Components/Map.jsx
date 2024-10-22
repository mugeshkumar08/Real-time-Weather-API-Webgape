import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import '../Components/Map.css'

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41],
});

const weatherURL = (lat, lon) =>
  `https://api.weatherapi.com/v1/current.json?key=1bcab522ac77404f96b42442242210&q=${lat},${lon}&aqi=no`;

const Map = ({ setCity, fetchWeatherData }) => {
  const [coords, setCoords] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setCoords([lat, lng]);
        fetchWeatherData(`${lat},${lng}`);
        setCity(`${lat}, ${lng}`);
      },
    });
    return null; 
  };

  return (
   <div className='map-container'>
    <h4>Click to get weather info!</h4>
     <div className='map' style={{ height: '500px', width: '85%', marginLeft:'7.5%', marginTop: '70px' }}>
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '80%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler /> {/* Add the map click handler */}
        {coords && (
          <Marker position={coords} icon={markerIcon}>
            <Popup>
              <div>
                <p>Click to get weather info!</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
     </div>
   </div>
  );
};

export default Map;
