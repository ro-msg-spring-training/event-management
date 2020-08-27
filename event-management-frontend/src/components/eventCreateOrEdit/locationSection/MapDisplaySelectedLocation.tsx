import React, { useEffect, useState } from "react";
import { LocationType } from "../../../types/LocationType";
import { Marker, Popup } from "react-leaflet";
import { Button } from "@material-ui/core";
import { blackMarkerPoint, greenMarkerPoint } from "./markerPointIcons";
import useStylesMapWrapper from "../../../styles/MapWrapperStyle";
import { useTranslation } from "react-i18next";

interface Props {
  selectedMarker: LocationType[];
  currentLocation: string;
}

const MapDisplaySelectedLocationDumb = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const { t } = useTranslation();

  return (
    <div>
      {props.selectedMarker.map((position: any, idx: number) => {
        return (
          <Marker key={idx} position={position} icon={greenMarkerPoint}>
            <Popup>
              <div className={classesMap.wrapperPopup}>
                <h1 className={classesMap.locationTitle}> {props.currentLocation} </h1>
                <p className={classesMap.text}>{t("location.selectedLocationMessage")}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default MapDisplaySelectedLocationDumb;
