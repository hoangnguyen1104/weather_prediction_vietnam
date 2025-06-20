import React, { useState, useEffect } from 'react';
import { WeatherProvider } from './contexts/WeatherContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastTabs from './components/ForecastTabs';
import WeatherMap from './components/WeatherMap';
import PopularCities from './components/PopularCities';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LanguageProvider>
        <LoadingSpinner />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <WeatherProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
          <div className="min-h-screen bg-black/10 backdrop-blur-sm">
            <Header />
            
            <main className="container mx-auto px-4 py-8 space-y-8">
              <div className="text-center space-y-4 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                  Vietnam Weather
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Real-time weather data and accurate forecasts for all cities and towns across Vietnam
                </p>
              </div>

              <SearchBar />
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <CurrentWeather />
                  <ForecastTabs />
                </div>
                
                <div className="space-y-6">
                  <WeatherMap />
                  <PopularCities />
                </div>
              </div>
            </main>
          </div>
        </div>
      </WeatherProvider>
    </LanguageProvider>
  );
}

export default App;