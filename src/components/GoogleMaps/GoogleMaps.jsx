import React, { useState, useCallback, useMemo, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SearchBox from "../SearchBox";
import style from "./GoogleMaps.module.css";
import  {extractPathRows , initData} from "../../utils/PathRowFinder"
import { square } from "@turf/turf";

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
  const [marker, setMarker] = useState();
  const [map, setMap] = useState();

  useEffect(() => { initData() } , [] )

  //callback function for when the map is clicked
  const onMapClick = useCallback((e) => {

    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    const squares = extractPathRows(newMarker.lat , newMarker.lng)

    squares.forEach( square => {
      new google.maps.Polygon({
        paths: square.coordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      }).setMap(map)
    })


    var latlng = new google.maps.LatLng(newMarker.lat , newMarker.lng)

    map && map.panTo(latlng)
    setMarker(newMarker)
  }, [])

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