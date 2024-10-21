import React, { useEffect, useState } from 'react';
import '../Components/Weather.css';
import Current from './Current';
import ForeCast from './ForeCast';

const autoCompleteURL = 'https://api.weatherapi.com/v1/search.json?key=0902070d1c9443f082083517241910&q=';
const weatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?key=0902070d1c9443f082083517241910&q=${city}&days=7&aqi=no&alerts=no`;
const Header = () => {
  const [city, setCity] = useState('')
  const [clicked, setClicked] = useState(false);
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState('');
  const [citySugg, setCitySugg] = useState([]);

  const handleClick = async (clickedCity) => {
    setCity(clickedCity);
     setCity(clickedCity);
    setClicked(true);

    const res = await fetch(weatherURL(city));
    const data = await res.json();
    setCurrent(data.current);
    setForecast(data.forecast);
    setLocation(data.location.name);
    console.log(data);
    
  };

  useEffect(() =>{
    const getDataAfterTimeout = setTimeout(() =>{
      const fetchCitySugg = async()=>{
        const res = await fetch(autoCompleteURL + city);
        const data = await res.json();
        const citySuggData = data.map(curData => `${curData.name},${curData.region},${curData.country}`);
        setCitySugg(citySuggData);
       };
       if(!clicked && city.length > 2){
         fetchCitySugg();
       } else{
         setCitySugg([])
         setClicked(false);
       }
    },1000)

    return () => clearTimeout(getDataAfterTimeout);
  }, [city]); 

  return (
    <div className='body'>
     <header>
      <h1>My Weather</h1>
       <b> <i class="bi bi-geo-alt-fill" style={{color: 'red'}}></i> {city}</b>
      <nav>
        <input type="search" className='searchBox' placeholder='Search City...'
        value={city}
          onChange={(e) => setCity(e.target.value)}
        /> 
        <div className='suggWapper'>
        {citySugg.map((curCity)=>(
          <div className='citySugg' onClick={() => handleClick (curCity)}>{curCity}</div>
        ))}
        </div>
      </nav>
    </header>

    <div className='content'>
      {current && <Current current={current} city={city} location={location}/>}
    </div>
    <div>
    {forecast && <ForeCast forecast={forecast} city={city} location={location}/>}
    </div>
    </div>
  )
}

export default Header