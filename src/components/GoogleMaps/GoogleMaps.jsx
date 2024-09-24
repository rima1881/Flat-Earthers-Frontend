import React, { useState, useCallback, useMemo , useContext, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";
import  { useTarget , useAvailableTargets } from "../../utils/useTarget"
import { square } from "@turf/turf";
import SearchBox from "../SearchBox";
import TargetSelect from "../TargetSelect/TargetSelect";
import { faL } from "@fortawesome/free-solid-svg-icons";


const containerStyle = {
  width: "100%",
  height: "100vh",
};

//initial center
const defaultCenter = {
  lat: 45.5019,
  lng: 73.5674,
};

const libraries = ["places"]


export default function GoogleMaps() {

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("Page is about to refresh or be closed.");
      // You can customize the message shown to the user (modern browsers may ignore this)
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // This is for older browsers
      return message; // This is for modern browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  //prerequisite for loading google maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  //setting the map and the marker
  const [marker, setMarker] = useState()
  const [map, setMap] = useState()
  const [availableTargets , setAvailbleTargets] = useState()

  //Implement our custom hooks
  const { targets } = useTarget()
  targets()
  //console.log(targets())

  console.log("kir")
  const getAvailableTargets =  useAvailableTargets()

  //callback function for when the map is clicked
  const onMapClick = useCallback((e) => {

    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    // Add the new marker to targets
    const data = getAvailableTargets(newMarker.lat, newMarker.lng)

    // Calculate the new coordinates including the new marker
    const coords = data.map( t => t.coordinates)
  
    // Create the polygon before setting state
    const t = new google.maps.Polygon({
      paths: coords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    })
  
    // Render the polygon on the map
    t.setMap(map)
  
    // Pan to the new marker
    var latlng = new google.maps.LatLng(newMarker.lat, newMarker.lng)
    map && map.panTo(latlng)
  
    // Now update the state, so the UI can update
    setMarker(newMarker)
    setAvailbleTargets(data)
  
  }, [ getAvailableTargets , map])


  //Function for when a place is searched
  const onSearch = (location) => {

    // TODO ---------------------------------------------
    setMarker({
      lat: location.lat(),
      lng: location.lng(),
    })

    map && map.panTo(location);
  }

  //Function for when the map is loaded
  const onLoadMap = (mapInstance) => {
    setMap(mapInstance);
  }

  if (loadError)
    return <div>Error loading map. Please try again later.</div>
  

  //optimization for map options
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  )

  return isLoaded ? (
    <div className={style.page}>
      <SearchBox onSearch={onSearch} inputClass={style.search} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onClick={onMapClick}
        options={mapOptions}
        onLoad={onLoadMap}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>


    </div>
      
  ) : (
    <div>Loading map...</div>
  );
}