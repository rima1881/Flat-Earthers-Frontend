import React, { useEffect, useState } from "react";
import * as turf from "@turf/turf";

export default function PathRowFinder ({ lat, lng }) {
  const [wrsData, setWrsData] = useState(null);
  const [pathRow, setPathRow] = useState(null);

  useEffect(() => {
    fetch("/WRS2.json")
      .then((response) => response.json())
      .then((data) => {
        setWrsData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (lat && lng && wrsData) {
      const res = getPathRow(lat, lng);
      setPathRow(res);
    }
  }, [lat, lng, wrsData]);

  const getPathRow = (lat, lng) => {
    if (!wrsData) return;

    const point = turf.point([lng, lat]);

    for (let feature of wrsData.features) {
      if (turf.booleanPointInPolygon(point, feature)) {
        const path = feature.properties.PATH;
        const row = feature.properties.ROW;
        return { path, row };
      }
    }
    return null;
  };


  console.log(pathRow);
  const content = pathRow ? <>
    <div>
      <h2>Path: {pathRow.path}</h2>
      <h2>Row: {pathRow.row}</h2>
    </div>
  </> : <>
    <p>mammad to find path</p>
  </>
  
  pathRow ? console.log("fall") : console.log("meow")

  return (
    <div>
      { content}
    </div>
  );
};
