// src/components/Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Weather.css';  // Your custom styles

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('New York');  // Default location

    useEffect(() => {
        getWeatherData();
    }, [location]);

    const getWeatherData = async () => {
        try {
            const res = await axios.get(`/api/weather/${location}`);
            setWeatherData(res.data);
        } catch (err) {
            console.error("Error fetching weather data", err);
        }
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSearch = () => {
        getWeatherData();
    };

    return (
        <div className="weather-container">
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Enter location" 
                    value={location} 
                    onChange={handleLocationChange} 
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {weatherData ? (
                <div className="weather-info">
                    <h2>{weatherData.timezone}</h2>
                    <div className="current-weather">
                        <h3>Current Weather</h3>
                        <div>Temperature: {weatherData.current.temp}°C</div>
                        <div>Humidity: {weatherData.current.humidity}%</div>
                        <div>Wind Speed: {weatherData.current.wind_speed} m/s</div>
                        <div>UV Index: {weatherData.current.uvi}</div>
                        <div>Sunrise: {moment(weatherData.current.sunrise * 1000).format('HH:mm a')}</div>
                        <div>Sunset: {moment(weatherData.current.sunset * 1000).format('HH:mm a')}</div>
                    </div>

                    <div className="forecast">
                        <h3>Daily Forecast</h3>
                        {weatherData.daily.slice(1, 6).map((day, idx) => (
                            <div key={idx} className="forecast-item">
                                <div>{moment(day.dt * 1000).format('dddd')}</div>
                                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
                                <div>Day: {day.temp.day}°C</div>
                                <div>Night: {day.temp.night}°C</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Weather;
