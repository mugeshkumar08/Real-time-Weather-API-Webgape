import React from 'react'
import '../Components/Current.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
const Current = ({current, location}) => {
  return (
    <>
     <div className='current'>
     </div>
     <div className='current-weather'>
     {current && current.condition ? (
          <>
           <div className='container'>
               <b> <i class="bi bi-geo-alt-fill" style={{color: 'red'}}></i> {location}</b>
               <span>
               <img className='weatherImg' src={current.condition.icon} alt={current.condition.text} /> <br />
               <span className='tempText'>{current.condition.text}</span>
                   <b className='temp'>Temp:</b> <h1>{current.temp_c}°C</h1>
                   
               </span>
               <span className='feelsLike'>
                   <b>Feels like:</b>
                   <h1>{current.feelslike_c}°C</h1>
               </span>
           </div>
           
           <div className='wrapper'>
               <div className='container-2'>
                  <span>
                  <i class="bi bi-wind" style={{fontSize: '25px', color: 'skyblue'}}></i> <b>Wind:</b>
                      <h1>{current.wind_kph}kph</h1>
                  </span>
               </div>
               <div className='container-2'>
                  <span>
                      <i class="bi bi-droplet-half" style={{color: 'skyblue', fontSize: '25px'}}></i> <b>Humidity:</b>
                      <h1>{current.humidity}%</h1>
                  </span>
               </div>
               <div className='container-2'>
                  <span>
                      <i class="bi bi-brightness-high-fill" style={{color: 'gold', fontSize: '25px'}}></i> <b>UV Index:</b> <br />
                      <h1>{current.uv}</h1>
                  </span>
               </div>
               <div className='container-2'>
                  <span>
                      <i class="bi bi-arrows-collapse" style={{fontSize: '25px'}}></i> <b>Pressure:</b> <br />
                      <h1>{current.pressure_mb}mb</h1>
                  </span>
               </div>
               <div className='container-2'>
                  <span>
                  <i class="bi bi-eye" style={{fontSize: '25px'}}></i> <b>Visibility:</b> <br />
                      <h1>{current.vis_km}km</h1>
                  </span>
               </div>
           </div>

          </>
        ) : (
          <span></span>
        )}
     </div>
    </>
  )
}

export default Current