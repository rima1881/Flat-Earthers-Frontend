import React, { useEffect, useState } from "react";
import * as turf from "@turf/turf";

const PathRowFinder = ({ lat, lng }) => {
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
      console.log(res);
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
        console.log(path);
        console.log(row);
        return { path, row };
      }
    }
    return null;
  };

  return (
    <div>
      {pathRow ? (
        <div>
          <h2>Path: {pathRow.path}</h2>
          <h2>Row: {pathRow.row}</h2>
        </div>
      ) : (
        <p>failed to find path</p>
      )}
    </div>
  );
};
export default PathRowFinder;
