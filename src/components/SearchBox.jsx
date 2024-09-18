import React, { useEffect, useRef } from "react";

const SearchBox = ({ onSearch , inputClass }) => {
  const inputref = useRef(null);

  //the useeffect hook is used to load the google maps places library and set up the autocomplete functionality
  //the onSearch function is called when a place is selected
  //
  useEffect(() => {
    if (inputref.current) {
      const input = inputref.current;
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["geocode"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          onSearch(place.geometry.location);
        }
      });
    }
  }, [onSearch]);

  return (
    <input
      ref={inputref}
      type="text"
      placeholder="Search for a place"
      className={inputClass}
    />
  );
};

export default SearchBox;
