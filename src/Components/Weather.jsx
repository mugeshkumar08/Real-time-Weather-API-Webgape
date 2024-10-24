import React, { useEffect, useState } from 'react';
import '../Components/Weather.css';
import Current from './Current';
import ForeCast from './ForeCast';
import Map from './Map';

const autoCompleteURL = 'https://api.weatherapi.com/v1/search.json?key=1bcab522ac77404f96b42442242210&q=';
const weatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?key=1bcab522ac77404f96b42442242210&q=${city}&days=7&aqi=no&alerts=no`;

const Header = () => {
  const [city, setCity] = useState('');
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState('');
  const [citySugg, setCitySugg] = useState([]);

  const fetchWeatherData = async (cityName) => {
    const res = await fetch(weatherURL(cityName));
    const data = await res.json();
    setCurrent(data.current);
    setForecast(data.forecast);
    setLocation(data.location.name);
  };

  const handleClick = (clickedCity) => {
    setCity(clickedCity);
    fetchWeatherData(clickedCity); 
    setCitySugg([]);
  };

  useEffect(() => {
    const getDataAfterTimeout = setTimeout(() => {
      const fetchCitySugg = async () => {
        const res = await fetch(autoCompleteURL + city);
        const data = await res.json();
        const citySuggData = data.map((curData) => `${curData.name}, ${curData.region}, ${curData.country}`);
        setCitySugg(citySuggData);
      };

      if (city.length > 2) {
        fetchCitySugg();
      } else {
        setCitySugg([]);
      }
    }, 1000);

    return () => clearTimeout(getDataAfterTimeout);
  }, [city]);

  return (
    <div className="body">
      <header>
        <h1>My Weather</h1>
        <b>
          <i className="bi bi-geo-alt-fill" style={{ color: 'red' }}></i> {location}
        </b>
        <nav>
          <input
            type="search"
            className="searchBox"
            placeholder="Search City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="suggWapper">
            {citySugg.map((curCity, index) => (
              <div className="citySugg" key={index} onClick={() => handleClick(curCity)}>
                {curCity}
              </div>
            ))}
          </div>
        </nav>
      </header>

      <div className="content">
        {current && <Current current={current} city={city} location={location} />}
      </div>
      <div>
        {forecast && <ForeCast forecast={forecast} city={city} location={location} />}
      </div>
      <div>
        {/* Pass the setCity function to Map component */}
        <Map setCity={setCity} fetchWeatherData={fetchWeatherData} />
      </div>
    </div>
  );
};

export default Header;
