import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStylesMapWrapper from "../../styles/MapWrapperStyle";
import "../../styles/Map.css";
import L from "leaflet";
import black_marker from "../../assets/marker_black.png";
import green_marker from "../../assets/marker_green.png";
import red_marker from "../../assets/marker_red.png";
import marker_shadow from "../../assets/marker-shadow.png";
import { Button } from "@material-ui/core";
import { useStyles } from "../../styles/CommonStyles";
import { LocationType } from "../../types/LocationType";
import { AppState } from "../../store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  locationFetch,
  locationFetchSucces,
  locationisLoading,
} from "../../actions/LocationActions";
import SearchBar from "./SearchBar";

const myLocations = [
  {
    id: 1,
    name: "The Office",
    address: "Bd. 21 Decembrie",
    latitude: "46.77603966",
    longitude: "23.603966",
    sublocations: [
      {
        id: 1,
        name: "Floor 1",
        maxCapacity: 200,
      },
      {
        id: 2,
        name: "Floor 2",
        maxCapacity: 250,
      },
    ],
    program: [
      {
        id: 1,
        weekday: 1,
        startHour: "10:00",
        endHour: "18:00",
      },
    ],
  },
  {
    id: 2,
    name: "Campus Observator",
    address: "str Observatorului nr 34",
    latitude: "46.756132",
    longitude: " 23.591557",
    sublocations: [
      {
        id: 3,
        name: "Camin 5",
        maxCapacity: 300,
      },
      {
        id: 4,
        name: "Camin 7",
        maxCapacity: 320,
      },
    ],
    program: [
      {
        id: 2,
        weekday: 1,
        startHour: "10:00",
        endHour: "18:00",
      },
    ],
  },
  {
    id: 3,
    name: "Hello",
    address: "str Observatorului nr 34",
    latitude: "46.756132",
    longitude: " 23.591557",
    sublocations: [
      {
        id: 3,
        name: "Camin 5",
        maxCapacity: 300,
      },
      {
        id: 4,
        name: "Camin 7",
        maxCapacity: 320,
      },
    ],
    program: [
      {
        id: 2,
        weekday: 1,
        startHour: "10:00",
        endHour: "18:00",
      },
    ],
  },
  {
    id: 4,
    name: "Heii",
    address: "str Observatorului nr 34",
    latitude: "46.756132",
    longitude: " 23.591557",
    sublocations: [
      {
        id: 3,
        name: "Camin 5",
        maxCapacity: 300,
      },
      {
        id: 4,
        name: "Camin 7",
        maxCapacity: 320,
      },
    ],
    program: [
      {
        id: 2,
        weekday: 1,
        startHour: "10:00",
        endHour: "18:00",
      },
    ],
  },
  {
    id: 5,
    name: "New place",
    address: "str Observatorului nr 34",
    latitude: "46.756132",
    longitude: " 23.591557",
    sublocations: [
      {
        id: 3,
        name: "Camin 5",
        maxCapacity: 300,
      },
      {
        id: 4,
        name: "Camin 7",
        maxCapacity: 320,
      },
    ],
    program: [
      {
        id: 2,
        weekday: 1,
        startHour: "10:00",
        endHour: "18:00",
      },
    ],
  },
];

export const blackMarkerPoint = new L.Icon({
  iconUrl: black_marker,
  shadowUrl: marker_shadow,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

export const greenMarkerPoint = new L.Icon({
  iconUrl: green_marker,
  shadowUrl: marker_shadow,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

export const redMarkerPoint = new L.Icon({
  iconUrl: red_marker,
  shadowUrl: marker_shadow,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

interface Props {
  isLoading: boolean;
  locations: LocationType[];
  locationisLoading: (loadingStatus: boolean) => void;
  locationFetchSuccess: (locations: LocationType[]) => void;
  locationFetch: () => void;
  locationStatus: string;
  setlocationStatus: any;
}
interface OwnProps {
  locationStatus: string;
  setlocationStatus: any;
}

const MapWrapper: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const classes = useStyles();
  const [position, setPosition]: any = useState([46.77121, 23.623634]);
  const [searchValue, setsearchValue] = useState("");
  const [searchValueLat, setsearchValueLat] = useState("-300");
  const [searchValueLong, setsearchValueLong] = useState("300");
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

  const [submitDisabled, setsubmitDisable] = useState(false);

  useEffect(() => {
    props.locationFetch();
    props.locationisLoading(false);
  }, []);

  const submitLocation = (id: number, lat: string, long: string) => {
    const markers: any[] = selectedMarker;

    markers.push([lat, long]);
    setSelectedMarker(markers);

    const ids = String(id);

    props.setlocationStatus(ids);
    setsubmitDisable(true);
  };
  const cancelSubmit = (position: number[]) => {
    setSelectedMarker([]);
    setsubmitDisable(false);
  };
  const displaySearch = () => {
    if (searchValueLong !== "0" && searchValueLat !== "0") {
      return (
        <Marker
          position={[parseFloat(searchValueLat), parseFloat(searchValueLong)]}
          icon={redMarkerPoint}
        ></Marker>
      );
    } else return null;
  };

  return (
    <div className={`${classesMap.mapWrapper} mapResponsive`}>
      <div className={classesMap.searchBar}>
        <SearchBar
          myLocations={myLocations}
          searchValue={searchValue}
          setSearchValue={setsearchValue}
          lat={searchValueLat}
          setLat={setsearchValueLat}
          long={searchValueLong}
          setLong={setsearchValueLong}
          setLocation={setsearchLocation}
          location={searchLocation}
          position={position}
          setPosition={setPosition}
        ></SearchBar>
      </div>

      <Map center={position} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {myLocations.map((location) => (
          <Marker
            key={location.id}
            position={[
              parseFloat(location.latitude),
              parseFloat(location.longitude),
            ]}
            icon={blackMarkerPoint}
          >
            <Popup>
              <div className={classesMap.wrapperPopup}>
                <h1 className={classesMap.locationTitle}>{location.name} </h1>
                {location.address}
                <br />{" "}
                <Button
                  className={`${classes.buttonStyle2} ${classes.buttonStyle3} ${classesMap.buttonPopup}`}
                  onClick={(e) => {
                    return submitLocation(
                      location.id,
                      location.latitude,
                      location.longitude
                    );
                  }}
                  disabled={submitDisabled}
                >
                  Select
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedMarker.map((position: any, idx: number) => {
          return (
            <Marker key={idx} position={position} icon={greenMarkerPoint}>
              <Popup>
                <div className={classesMap.wrapperPopup}>
                  <p className={classesMap.text}>
                    Selected location for the event
                  </p>
                  <Button
                    className={`${classes.buttonStyle2} ${classes.buttonStyle3} ${classesMap.buttonPopup}`}
                    onClick={(e) => {
                      return cancelSubmit(position);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {displaySearch}

        <Marker
          position={[parseFloat(searchValueLat), parseFloat(searchValueLong)]}
          icon={redMarkerPoint}
        >
          <Popup>
            <div className={classesMap.wrapperPopup}>
              <h1 className={classesMap.locationTitle}>
                {searchLocation.name}{" "}
              </h1>
              {searchLocation.address}
              <br />{" "}
              <Button
                className={`${classes.buttonStyle2} ${classes.buttonStyle3} ${classesMap.buttonPopup}`}
                onClick={(e) => {
                  return submitLocation(
                    searchLocation.id,
                    searchLocation.latitude,
                    searchLocation.longitude
                  );
                }}
                disabled={submitDisabled}
              >
                Select
              </Button>
            </div>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};
const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  locations: state.location.locations,
  isLoading: state.location.isLoading,
  locationStatus: ownProps.locationStatus,
  setlocationStatus: ownProps.setlocationStatus,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  locationFetch: () => dispatch(locationFetch()),
  locationFetchSuccess: (locations: LocationType[]) =>
    dispatch(locationFetchSucces(locations)),
  locationisLoading: (loadingStatus: boolean) =>
    dispatch(locationisLoading(loadingStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
//export default MapWrapper;
