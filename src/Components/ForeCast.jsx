import React, { useState } from 'react';
import '../Components/ForeCast.css';

const WeatherItem = ({ weathers, subWeather }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className={`weather-item ${show ? 'active' : ''}`}>
      <div className="weather-item-header" onClick={toggleShow}>
        {weathers}
      </div>
      {show && (
        <div className="weather-item-body">
          <div className="weather-item-body-content">{subWeather}</div>
        </div>
      )}
    </div>
  );
};

const WeatherAccordion = ({ data }) => {
  return (
    <div className="weather-accordion">
      {data.map((item) => (
        <WeatherItem key={item.id} weathers={item.weathers} subWeather={item.subWeather} />
      ))}
    </div>
  );
};

const ForeCast = ({ city, forecast, location }) => {
  if (!forecast || !forecast.forecastday) {
    return <div>{city}</div>;
  }

  return (
    <div className='forcast-section'>
      <b>Forecast: <i class="bi bi-geo-alt-fill" style={{color: 'red'}}></i> {location}</b>
      {forecast.forecastday.map((curDateForecast, index) => {
        const { date, day, hour } = curDateForecast;
        const { maxtemp_c, mintemp_c, daily_chance_of_rain, condition: { text, icon } } = day;

        // hourly data
        const hourlyWeather = hour.map((hourData, hourIndex) => {
          const {
            time,
            temp_c,
            chance_of_rain,
            condition: { text: hourText, icon: hourIcon }
          } = hourData;

          return (
            <div key={hourIndex} className='hourly-section'>
              <div className='weatherHourly'>
                <div>
                  <img src={hourIcon} alt="hourly weather icon" /> {time.split(' ')[1]} ({hourText})
                </div>
                <div>
                  <b>Temp:</b> <i class="bi bi-thermometer-high" style={{color: 'gold' , fontSize: '20px'}}></i> {temp_c}°C
                </div>
                <div>
                  <b>Chance of Rain:</b> <i class="bi bi-cloud-rain" style={{color: 'skyblue', fontSize: '20px'}}></i> {chance_of_rain}%
                </div>
              </div>
            </div>
          );
        });

        const data = [
          {
            id: 1,
            weathers: (
              <div className='weather-section'>
                <div className='weatherDaily'>
                  <div>
                    <img src={icon} alt="daily weather icon" /> {date} ({text})
                  </div>
                  <div>
                    <b>Max Temp:</b> <i class="bi bi-thermometer-high" style={{color: 'gold', fontSize: '20px'}}></i> {maxtemp_c}°C  <b>Min Temp:</b> <i class="bi bi-thermometer-low" style={{color: 'gold', fontSize: '20px'}}></i> {mintemp_c}°C
                  </div>
                  <div>
                    <b>Chance of Rain:</b> <i class="bi bi-cloud-rain" style={{color: 'skyblue', fontSize: '20px'}}></i> {daily_chance_of_rain}%
                  </div>
                </div>
              </div>
            ),
            subWeather: (
              <div>
                <h5>Hourly Forecast</h5>
                {hourlyWeather} {/* Render the hourly forecast here */}
              </div>
            ),
          },
        ];

        return (
          <div key={index}>
            <WeatherAccordion data={data} />
          </div>
        );
      })}
    </div>
  );
};

export default ForeCast;
