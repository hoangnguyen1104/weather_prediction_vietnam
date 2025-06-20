import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherData, ForecastData, vietnameseCities } from '../data/weatherData';
import { weatherService } from '../services/weatherService';
import { useLanguage } from './LanguageContext';

interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  selectedCity: string;
  isLoading: boolean;
  error: string | null;
  setSelectedCity: (city: string) => void;
  refreshWeather: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [selectedCity, setSelectedCity] = useState('Ho Chi Minh City');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const fetchWeatherData = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(cityName, language),
        weatherService.getForecast(cityName, 10, language)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWeather = () => {
    fetchWeatherData(selectedCity);
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const value = {
    currentWeather,
    forecast,
    selectedCity,
    isLoading,
    error,
    setSelectedCity,
    refreshWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};