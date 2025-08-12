import { useState, useEffect } from "react";
import countriesService from "./services/countriesService";
import Country from "./Country";
import Weather from "./Weather";
import Countries from "./Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const filterCountries = (text) =>
    countries?.filter((country) => {
      const common = country.name.common.toLowerCase();
      const official = country.name.official.toLowerCase();
      return common.includes(text) || official.includes(text);
    });

  const filteredCountries = filterCountries(search);

  useEffect(() => {
    countriesService
      .getAll()
      .then(setCountries)
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const updateState = async (name) => {
    try {
      const countryData = await countriesService.getCountry(name);
      setCountry(countryData);
      const weatherData = await countriesService.getWeather(
        countryData.capital[0]
      );
      setWeather(weatherData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    const filtered = filterCountries(e.target.value);
    if (filtered && filtered.length !== 1) {
      setCountry(null);
      setWeather(null);
      return;
    }
    updateState(filtered[0].name.common);
  };

  const handleShow = (name) => {
    updateState(name);
  };

  if (!countries) return <div>loading...</div>;

  return (
    <>
      find countries :{" "}
      <input
        name="search"
        type="search"
        value={search}
        onChange={handleChange}
      />
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : country ? (
        <>
          <Country country={country} />
          <Weather weather={weather} />
        </>
      ) : (
        <Countries countries={filteredCountries} handleShow={handleShow} />
      )}
    </>
  );
}

export default App;
