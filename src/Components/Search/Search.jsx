import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoApiOptions } from "../../Api";
import { GEO_API_URL } from "../../Api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      GeoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };
  return (
    <AsyncPaginate
      placeholder="Search for a city..."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className=" w-2/3 md:w-1/3 mx-auto  border border-slate-900 rounded-md border-none outline-none"
    />
  );
};

export default Search;
