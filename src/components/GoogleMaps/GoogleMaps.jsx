import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";
import  { useTarget , useWRS2 } from "../../utils/useTarget"
import { square } from "@turf/turf";
import SearchBox from "../SearchBox";
import TargetSelect from "../TargetSelect/TargetSelect";


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

  //prerequisite for loading google maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  //setting the map and the marker
  const [marker, setMarker] = useState()
  const [map, setMap] = useState()

  //  It is passed to select Options and cleared there
  const [availableTargets , setAvailbleTargets] = useState([])

  const clearAvailableTargets = useCallback( () => {

    availableTargets.forEach( availableTarget => availableTarget.shape.setMap() )
    
    setAvailbleTargets([])
  } , [ availableTargets , map] )

  //  Custom Hooks
  const getAvailableTargets = useWRS2()
  //  TODO----------------------------------------------
  //  Implement A load function on saved Targets
  const { targets } = useTarget()


  const setActiveHandle = useCallback( (i) => {

  },[map , availableTargets])

  //callback function for when the map is clicked
  const onMapClick = useCallback((e) => {

    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }

    // Add the new marker to targets
    const squares = getAvailableTargets(newMarker.lat, newMarker.lng)

    // Calculate the new coordinates including the new marker
    squares.forEach( sq => {

      sq.shape = new google.maps.Polygon({
        paths : sq.coordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
      })

      sq.shape.setMap(map)

    })
  
    // Pan to the new marker
    var latlng = new google.maps.LatLng(newMarker.lat, newMarker.lng)
    map && map.panTo(latlng)
  
    // Now update the state, so the UI can update
    setMarker(newMarker)
    setAvailbleTargets(squares)
  
  }, [map])


  //  Function for when a place is searched
  //  TODO---------------------------------------
  //  Has to be synced with onMapClick 
  const onSearch = useCallback( (location) => {

    setMarker({
      lat: location.lat(),
      lng: location.lng(),
    })

    map && map.panTo(location);
  } , [map])


  //Function for when the map is loaded
  const onLoadMap = (mapInstance) => {
    setMap(mapInstance);
  }

  //  TODO--------------------------------------
  //  Have to created a Fail Load template
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

      <TargetSelect options={availableTargets} clearOptions={clearAvailableTargets} />
    </div>
      
  ) : (
    //  TODO------------------------------------------------------
    //  Have to create a loading template
    <div>Loading map...</div>
  )
}