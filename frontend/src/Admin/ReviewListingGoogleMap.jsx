import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '40vw',
  height: '400px'
};

const ReviewMapComponent = ({ lat, lng }) => {
  const center = { lat, lng };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(ReviewMapComponent);