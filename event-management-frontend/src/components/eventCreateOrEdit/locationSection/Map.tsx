import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStylesMapWrapper from "../../../styles/MapWrapperStyle";
import "../../../styles/Map.css";
import L from "leaflet";
import { Button } from "@material-ui/core";
import { useStyles } from "../../../styles/CommonStyles";
import { LocationType } from "../../../types/LocationType";
import { AppState } from "../../../store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { locationFetch, locationFetchSucces, locationisLoading } from "../../../actions/LocationActions";
import SearchBar from "./SearchBar";
import { updateLocation } from "../../../actions/HeaderEventCrudActions";
import { blackMarkerPoint, greenMarkerPoint, redMarkerPoint } from "./markerPointIcons";
import MapDisplayLocationsDumb from "./MapdisplayLocationsDumb";
import MapDisplaySelectedLocationDumb from "./MapDisplaySelectedLocation";
import MapDisplaySearchMarker from "./MapDisplaySearchMarker";

interface Props {
  isLoading: boolean;
  locations: LocationType[];
  locationisLoading: (loadingStatus: boolean) => void;
  locationFetchSuccess: (locations: LocationType[]) => void;
  locationFetch: () => void;
  updateLocation: (id: number) => void;
  locationStatus: string;
  setlocationStatus: any;
  idLocation: number;
}
interface OwnProps {
  locationStatus: string;
  setlocationStatus: any;
}

const MapWrapper: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const classes = useStyles();
  const { t } = useTranslation();
  const [position, setPosition]: any = useState([46.77121, 23.623634]);
  const [searchValue, setsearchValue] = useState("");
  const [currentLocation, setcurrentLocation] = useState("");
  const [searchLocation, setsearchLocation] = useState({
    id: 0,
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    sublocations: [],
    program: [],
  });
  const [selectedMarker, setSelectedMarker]: any = useState([]);
  const [searchMarker, setSearchMarker]: any = useState([]);
  const [submitDisabled, setSubmitDisable] = useState(false);

  useEffect(() => {
    props.locationFetch();
    props.locationisLoading(false);
  }, []);

  useEffect(() => {
    const location = props.locations.find((loc) => loc.id === props.idLocation);

    if (location !== undefined) {
      const markers: any[] = [];
      markers.push([location.latitude, location.longitude]);
      setSelectedMarker(markers);
      setcurrentLocation(location.name);
    }
  }, [props.locations]);

  const submitLocation = (id: number, lat: string, long: string, name: string) => {
    setSearchMarker([]);

    const markers: any[] = [];

    markers.push([lat, long]);
    setSelectedMarker(markers);

    props.updateLocation(id);

    const ids = String(id);

    props.setlocationStatus(ids);
    console.log(id);
    //const location = props.locations.find((loc) => loc.id === props.idLocation);
    //console.log(location);

    //console.log(location);
    setcurrentLocation(name);
    console.log(selectedMarker);
  };

  return (
    <div className={`${classesMap.mapWrapper} mapResponsive`}>
      <div className={classesMap.searchBar}>
        <SearchBar
          myLocations={props.locations}
          searchValue={searchValue}
          setSearchValue={setsearchValue}
          setLocation={setsearchLocation}
          location={searchLocation}
          position={position}
          setPosition={setPosition}
          searchMarker={searchMarker}
          setsearchMarker={setSearchMarker}
        ></SearchBar>
      </div>

      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapDisplayLocationsDumb locations={props.locations} submitLocation={submitLocation}></MapDisplayLocationsDumb>
        <MapDisplaySelectedLocationDumb currentLocation={currentLocation} selectedMarker={selectedMarker} />
        <MapDisplaySearchMarker
          searchMarker={searchMarker}
          searchLocation={searchLocation}
          submitLocation={submitLocation}
        ></MapDisplaySearchMarker>
      </Map>
    </div>
  );
};
const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  locations: state.location.locations,
  isLoading: state.location.isLoading,
  locationStatus: ownProps.locationStatus,
  setlocationStatus: ownProps.setlocationStatus,
  idLocation: state.eventCrud.event.location,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  locationFetch: () => dispatch(locationFetch()),
  locationFetchSuccess: (locations: LocationType[]) => dispatch(locationFetchSucces(locations)),
  locationisLoading: (loadingStatus: boolean) => dispatch(locationisLoading(loadingStatus)),
  updateLocation: (idLocation: number) => dispatch(updateLocation(idLocation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
