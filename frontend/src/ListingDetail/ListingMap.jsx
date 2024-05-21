import React, { useState, useEffect } from "react";
import { Text } from "@aws-amplify/ui-react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';



const ListingMap = () => {

  const [mapHeight, setMapHeight] = useState("")
  const [mapWidth, setMapWidth] = useState()

  useEffect(() => {
    // Update the column count and grid width when the window is resized
    function handleResize() {
      const screenWidth = window.screen.width;

      if (768 > screenWidth) {

        console.log('screenWidth', screenWidth)
      } else {

      }
    }

    window.addEventListener('resize', handleResize);


    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const location = useLocation();
  const [mapKey, setMapKey] = useState(Date.now());
  useEffect(() => {
    // Force a re-render of the map when the route changes
    setMapKey(Date.now());
  }, [location.pathname]);

  const mapStyles = {
    height: "350px",
    width: "25vw",
    margin: "3% 5% 0 3%",
  };

  const defaultCenter = {
    lat: 22.291048,
    lng: 114.181814,
  };

  return (
    <div className="list-detail-map">
      <LoadScript googleMapsApiKey="" key={mapKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={9}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};



export default ListingMap