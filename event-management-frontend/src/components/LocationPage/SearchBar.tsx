import React, { useState, useEffect } from "react";
import useStylesSearchBar from "../../styles/SearchBarStyle";

interface Props {
  myLocations: any[];
  searchValue: string;
  setSearchValue: any;
  setLocation: any;
  location: {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    sublocations: never[];
    program: never[];
  };
  position: any;
  setPosition: any;
  searchMarker: any[];
  setsearchMarker: any;
}
const SearchBar = (props: Props) => {
  const classesSearch = useStylesSearchBar();
  const [flag, setFlag] = useState(true);
  const [suggestions, setSuggestions]: any = useState([]);

  useEffect(() => {
    if (props.searchValue.length > 0 && flag) {
      const results = props.myLocations.filter((item) =>
        item.name.toLowerCase().includes(props.searchValue.toLowerCase())
      );
      setSuggestions(results);
    } else {
      setSuggestions([]);
      setFlag(true);
    }
  }, [props.searchValue]);

  const searchLocationCoord = (value: string) => {
    props.myLocations.map((location) => {
      console.log(value);
      if (location.name === value) {
        props.setLocation(location);
        props.setPosition([location.latitude, location.longitude]);
        props.setsearchMarker([[location.latitude, location.longitude]]);
      }
    });
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    } else {
      if (suggestions.length > 4) {
        const firstSuggestions = suggestions.slice(0, 4);
        setSuggestions(firstSuggestions);
      }
    }
    return (
      <div className={classesSearch.containerSuggestions}>
        <ul className={classesSearch.suggestionsText}>
          {suggestions.map((location: any) => (
            <li
              className={classesSearch.suggestedItem}
              onClick={() => suggestionSelected(location.name)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const suggestionSelected = (value: string) => {
    setSuggestions([]);
    props.setSearchValue(value);
    console.log(props.searchValue);
    setFlag(false);
    searchLocationCoord(value);
  };

  return (
    <div className={classesSearch.searchBar}>
      <input
        placeholder="Search Location "
        className={classesSearch.searchBarInput}
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
};

export default SearchBar;
