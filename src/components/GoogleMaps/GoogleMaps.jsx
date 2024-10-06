import React, { useState, useCallback, useMemo, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import style from "./GoogleMaps.module.css";
import { useTarget, useWRS2 } from "../../utils/useTarget";
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

const libraries = ["places"];

export default function GoogleMaps() {
  //prerequisite for loading google maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  //setting the map and the marker
  const [marker, setMarker] = useState();
  const [showMarkers, setShowMarkerts] = useState(false);

  const [map, setMap] = useState();
  let option = 0;
  //  It is passed to select Options and cleared there
  const [availableTargets, setAvailbleTargets] = useState([]);

  const clearAvailableTargets = useCallback(() => {
    availableTargets.forEach((availableTarget) =>
      availableTarget.shape.setMap()
    );

    setAvailbleTargets([]);
  }, [availableTargets]);

  //  Custom Hooks
  const getAvailableTargets = useWRS2();
  //  TODO----------------------------------------------
  //  Implement A load function on saved Targets
  const { targetsState } = useTarget();
  const { targets } = targetsState();

  //callback function for when the map is clicked
  const updateMarkerAndTargets = useCallback(
    (lat, lng) => {
      clearAvailableTargets();

      const newMarker = {
        lat: lat,
        lng: lng,
      };

      // Add the new marker to targets
      const squares = getAvailableTargets(newMarker.lat, newMarker.lng);
      squares.activeIndex = option;
      // Calculate the new coordinates including the new marker

      squares.forEach((sq, index) => {
        sq.shape = new google.maps.Polygon({
          paths: sq.coordinates,
          strokeColor: index === squares.activeIndex ? "#0000FF" : "#FF0000", // Corrected color code
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: index === squares.activeIndex ? "#0000FF" : "#FF0000", // Corrected color code
          fillOpacity: 0.35,
        });

        sq.shape.setMap(map);
      });

      // Pan to the new marker
      var latlng = new google.maps.LatLng(newMarker.lat, newMarker.lng);
      map && map.panTo(latlng);

      // Now update the state, so the UI can update
      setMarker(newMarker);
      setAvailbleTargets(squares);
    },
    [availableTargets, map]
  );

  const onMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      updateMarkerAndTargets(lat, lng);
    },
    [updateMarkerAndTargets]
  );

  //  Function for when a place is searched
  //  TODO---------------------------------------
  //  Has to be synced with onMapClick
  const onSearch = useCallback(
    (location) => {
      const lat = location.lat();
      const lng = location.lng();
      updateMarkerAndTargets(lat, lng);
    },
    [updateMarkerAndTargets]
  );

  //Function for when the map is loaded
  const onLoadMap = (mapInstance) => {
    setMap(mapInstance);
  };

  const activeHandle = useCallback(
    (index) => {
      option = index;
      updateMarkerAndTargets(marker.lat, marker.lng);
    },
    [availableTargets]
  );

  // Handle toggle button to show/hide markers
  const [showTargets, setShowTargets] = useState(false);

  const handleToggle = (isChecked) => {
    setShowTargets(isChecked);
    setShowMarkerts(isChecked); // Show/hide markers when toggled
    console.log(isChecked);
  };

  const renderedTargets = targets.map((target, index) => (
    <Marker
      key={index}
      position={{
        lat: target.lat,
        lng: target.lng,
      }}
      icon={{
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom marker URL
      }}
      title={`Row: ${target.row}, Path: ${target.path}`}
    />
  ));

  if (loadError) return <div>Error loading map. Please try again later.</div>;

  //optimization for map options
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  return isLoaded ? (
    <div className={style.page}>
      <label className={style.switch}>
        <input
          type="checkbox"
          onChange={(e) => handleToggle(e.target.checked)}
        />
        <span className={style.slider}>
          {showTargets ? "Hide Targets" : "Show Targets"}
        </span>
      </label>

      <SearchBox onSearch={onSearch} inputClass={style.search} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        onClick={onMapClick}
        options={mapOptions}
        onLoad={onLoadMap}
      >
        {showTargets && renderedTargets}
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>

      <TargetSelect
        options={availableTargets}
        setActive={activeHandle}
        coordinates={
          marker ? { lat: marker.lat, lng: marker.lng } : { lat: 0, lng: 0 }
        }
        clearOptions={clearAvailableTargets}
      />
    </div>
  ) : (
    <div>Loading map...</div>
  );
}
