import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun,
  MapPin,
  Calendar
} from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useLanguage } from '../contexts/LanguageContext';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';

const CurrentWeather: React.FC = () => {
  const { currentWeather, isLoading, error } = useWeather();
  const { language, t } = useLanguage();

  if (isLoading) {
    return (
      <div className="weather-card animate-pulse">
        <div className="h-48 bg-white/20 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <div className="text-center text-white">
          <p className="text-lg font-semibold">{t('current.error')}</p>
          <p className="text-white/70">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentWeather) return null;

  const weatherStats = [
    { icon: Droplets, label: t('current.humidity'), value: `${currentWeather.humidity}%` },
    { icon: Wind, label: t('current.wind'), value: `${currentWeather.windSpeed} km/h ${currentWeather.windDirection}` },
    { icon: Eye, label: t('current.visibility'), value: `${currentWeather.visibility} km` },
    { icon: Gauge, label: t('current.pressure'), value: `${currentWeather.pressure} hPa` },
    { icon: Sun, label: t('current.uv_index'), value: currentWeather.uvIndex.toString() },
    { icon: Thermometer, label: t('current.feels_like'), value: `${currentWeather.feelsLike}°C` },
  ];

  const dateLocale = language === 'vi' ? vi : enUS;

  return (
    <div className="weather-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-white/70" />
          <h2 className="text-2xl font-bold text-white">{currentWeather.city}</h2>
        </div>
        <div className="flex items-center space-x-2 text-white/70">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            {format(currentWeather.timestamp, 'MMM dd, HH:mm', { locale: dateLocale })}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
            <span className="text-6xl">{currentWeather.icon}</span>
            <div>
              <div className="text-5xl font-bold text-white">
                {currentWeather.temperature}°C
              </div>
              <div className="text-white/70 capitalize">
                {currentWeather.description}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {weatherStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/10 rounded-xl p-3 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-2 mb-1">
                <stat.icon className="h-4 w-4 text-white/70" />
                <span className="text-xs text-white/70 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <div className="text-white font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;