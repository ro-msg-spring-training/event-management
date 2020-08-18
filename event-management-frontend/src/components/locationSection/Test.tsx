import React, { useState } from "react";
import MapWrapper from "./Map";

export const Test = () => {
  const [idLocation, setidLocation] = useState("");
  console.log(idLocation);
  return (
    <MapWrapper
      locationStatus={idLocation}
      setlocationStatus={setidLocation}
    ></MapWrapper>
  );
};
