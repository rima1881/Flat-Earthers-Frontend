import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SearchBox from "./SearchBox";
import PathRowFinder from "./PathRowFinder";


const containerStyle = {
  width: "100%",
  height: "800px",
};

//initial center
const defaultCenter = {
  lat: 45.5019,
  lng: 73.5674,
};

const libraries = ["places"]


export default function GoogleMaps() {
  //prerequisite for loading google maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  //setting the map and the marker
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);

  //callback function for when the map is clicked
  const onMapClick = useCallback((e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
    if (map) {
      map.panTo(latlng);
    }
    setMarker(newMarker);
  }, []);

  //Function for when a place is searched
  const onSearch = (location) => {
    const newMarker = {
      lat: location.lat(),
      lng: location.lng(),
    };

    setMarker(newMarker);
    if (map) {
      map.panTo(location);
      //map.zoom = 15;
    }
  };

  //Function for when the map is loaded
  const onLoadMap = (mapInstance) => {
    setMap(mapInstance);
  };

  if (loadError) {
    return <div>Error loading map. Please try again later.</div>;
  }
  //optimization for map options
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  return isLoaded ? (
    <div>
      <SearchBox onSearch={onSearch} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onClick={onMapClick}
        options={mapOptions}
        onLoad={onLoadMap}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
        <PathRowFinder lat={marker?.lat} lng={marker?.lng} />
      </GoogleMap>

      {marker && (
        <div style={{ marginTop: "10px" }}>
          <h3>Marker Position</h3>
          <p>Latitude: {marker.lat}</p>
          <p>Longitude: {marker.lng}</p>
        </div>
      )}
    </div>
  ) : (
    <div>Loading map...</div>
  );
}