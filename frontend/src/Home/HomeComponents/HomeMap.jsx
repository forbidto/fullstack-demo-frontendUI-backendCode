import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const HomeMap = () => {

    const location = useLocation();
    const [mapKey, setMapKey] = useState(Date.now());
     useEffect(() => {
    // Force a re-render of the map when the route changes
    setMapKey(Date.now());
  }, [location.pathname]);

  const mapStyles = {
    height: "50vh",
    width: "80vw",
    margin:"2% 10% 0 10%",
  };

  const defaultCenter = {
    lat: 22.291048,
    lng: 114.181814,
  };

  return (
    <LoadScript googleMapsApiKey="" key={mapKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={9}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default HomeMap;