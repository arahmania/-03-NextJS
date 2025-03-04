import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [inputCity, setInputCity] = useState('');

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  return (
    <div className="weather-container">
      <div className="weather-content">
        <h1>Informasi Cuaca</h1>
        
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Masukkan nama kota"
            />
            <button type="submit">Cari</button>
          </div>
        </form>

        {weather ? (
          <div className="weather-card">
            <h2>Cuaca di {weather.name}</h2>
            <div className="weather-info">
              <p>
                <span className="label">Suhu:</span>{' '}
                <span className="value">{Math.round(weather.main.temp - 273.15)}°C</span>
              </p>
              <p>
                <span className="label">Cuaca:</span>{' '}
                <span className="value">{weather.weather[0].description}</span>
              </p>
              <p>
                <span className="label">Kelembapan:</span>{' '}
                <span className="value">{weather.main.humidity}%</span>
              </p>
              <p>
                <span className="label">Kecepatan Angin:</span>{' '}
                <span className="value">{weather.wind.speed} m/s</span>
              </p>
              <p>
                <span className="label">Tekanan:</span>{' '}
                <span className="value">{weather.main.pressure} hPa</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>

      <style jsx>{`
        .weather-container {
          min-height: 100vh;
          background-color: #000;
          color: #fff;
          padding: 2rem;
        }

        .weather-content {
          max-width: 500px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .search-box {
          display: flex;
          gap: 10px;
          margin-bottom: 2rem;
        }

        input {
          flex: 1;
          padding: 10px 15px;
          background-color: #1a1a1a;
          border: 1px solid #333;
          color: white;
          border-radius: 4px;
          font-size: 1rem;
        }

        input:focus {
          outline: none;
          border-color: #fff;
        }

        button {
          padding: 10px 20px;
          background-color: #fff;
          color: #000;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #e0e0e0;
        }

        .weather-card {
          background-color: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .weather-card h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .weather-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .weather-info p {
          font-size: 1.1rem;
        }

        .label {
          color: #999;
        }

        .value {
          font-weight: bold;
        }

        .loading {
          text-align: center;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default Weather;
