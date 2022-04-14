const { useState, useEffect } = require('react');
// e6b599415a269a00410ee2f4055aed56
const WeatherAPI = () => {
  const [loading, setLoading] = useState(true);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [weather, setWeather] = useState([]);
  const getGeo = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=shanghai&limit=5&appid=e6b599415a269a00410ee2f4055aed56`
    );
    const json = await response.json();
    console.log('set geo');
    setLat(json[0].lat);
    setLon(json[0].lon);
    setLoading(false);
  };
  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e6b599415a269a00410ee2f4055aed56`
    );
    const json = await response.json();
    setWeather(json);
    console.log(json);
  };
  useEffect(() => {
    getGeo();
  }, []);
  useEffect(() => {
    getWeather();
  }, [lon]);

  return (
    <div>
      {loading ? (
        'Loading'
      ) : (
        <div>
          <p>{weather.name}</p>
          <ul>
            <li>{weather.main.humidity}</li>
            <li>{Math.round((weather.main.temp - 273.15) * 2) / 2}</li>
            <li>{weather.weather[0].main}</li>
            <li>{weather.weather[0].description}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherAPI;
