import React, { useState, useEffect } from "react";
import useStylesSearchBar from "../../../styles/SearchBarStyle";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import { LocationType } from "../../../types/LocationType";

interface Props {
  myLocations: LocationType[];
  searchValue: string;
  updateSearchValue: (searchValue: string) => void;
  setLocation: any;
  location: {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  position: string[];
  setPosition: any;
  searchMarker: string[];
  setsearchMarker: any;
}
const SearchBar = (props: Props) => {
  const classesSearch = useStylesSearchBar();
  const [flag, setFlag] = useState(true);
  const [suggestions, setSuggestions] = useState<LocationType[]>([]);
  const { t } = useTranslation();

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
          {suggestions.map((location: LocationType) => (
            <li className={classesSearch.suggestedItem} onClick={() => suggestionSelected(location.name)}>
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const suggestionSelected = (value: string) => {
    setSuggestions([]);
    props.updateSearchValue(value);
    setFlag(false);
    searchLocationCoord(value);
  };

  return (
    <div className={classesSearch.searchBar}>
      <Input
        placeholder={t("location.searchBarText")}
        className={classesSearch.searchBarInput}
        value={props.searchValue}
        onChange={(e) => props.updateSearchValue(e.target.value)}
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      {renderSuggestions()}
    </div>
  );
};

export default SearchBar;
