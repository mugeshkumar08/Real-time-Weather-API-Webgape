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
               <i class="bi bi-geo-alt-fill" style={{color: 'red'}}>{location}</i> 
               <span>
               <div className='weatherImg'><img className='' src={current.condition.icon} alt={current.condition.text} /> </div>
               <div className='tempText'> <b>Temp: {current.condition.text} </b> <span className='temp'>{current.temp_c}°C</span> </div>  
               </span>
               <span className='feelsLike'>
                   <div className='feelsLike'><b>Feels like:</b><span className='feelTemp'>{current.feelslike_c}°C</span></div>
               </span>
           </div>
           
           <div className='wrapper'>
               <div className='container-2'>
                  <div className='current1'>
                  <i class="bi bi-wind" style={{fontSize: '40px', color: 'skyblue', marginLeft: '80px'}}></i> 
                      <div className='currentTemp'><strong>Wind</strong> <span className='value'>{current.wind_kph}kph</span></div>
                  </div>
               </div>
               <div className='container-2'>
                  <div className='current1'>
                      <i class="bi bi-droplet-half" style={{color: 'skyblue', fontSize: '40px', marginLeft: '80px'}}></i> 
                      <div className='currentTemp'><strong>Humidity</strong> <span className='value'>{current.humidity}%</span></div>
                  </div>
               </div>
               <div className='container-2'>
                  <div className='current1'>
                      <i class="bi bi-brightness-high-fill" style={{color: 'gold', fontSize: '40px', marginLeft: '80px'}}></i> 
                      <div className='uv'><strong>UV Index</strong> <span className='value'>{current.uv}</span></div>
                  </div>
               </div>
               <div className='container-2'>
                  <div className='current1'>
                      <i class="bi bi-arrows-collapse" style={{fontSize: '40px', marginLeft: '80px'}}></i> 
                      <div className='Pressure'><b>Pressure</b> <span className='value'>{current.pressure_mb}mb</span></div>
                  </div>
               </div>
               <div className='container-2'>
                  <div className='current1'>
                  <i class="bi bi-eye" style={{fontSize: '40px', marginLeft: '80px'}}></i> 
                      <div className='currentTemp'><strong>Visibility</strong> <span className='value'>{current.vis_km}km</span></div>
                  </div>
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