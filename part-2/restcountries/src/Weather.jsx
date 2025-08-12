const Weather = ({ weather }) => {
  if (!weather) return null;
  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </>
  );
};

export default Weather;
