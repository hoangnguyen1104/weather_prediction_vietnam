import React from 'react';
import { Map, Layers } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useLanguage } from '../contexts/LanguageContext';
import { vietnameseCities } from '../data/weatherData';

const WeatherMap: React.FC = () => {
  const { selectedCity, setSelectedCity } = useWeather();
  const { t } = useLanguage();

  return (
    <div className="weather-card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Map className="h-5 w-5" />
          <span>{t('map.title')}</span>
        </h3>
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200">
          <Layers className="h-4 w-4 text-white" />
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl p-4 h-64 overflow-hidden">
        {/* Simplified Vietnam map representation */}
        <div className="relative w-full h-full">
          <svg viewBox="0 0 200 300" className="w-full h-full">
            {/* Simplified Vietnam outline */}
            <path
              d="M100 20 L120 40 L110 80 L130 120 L120 160 L140 200 L130 240 L110 280 L90 270 L80 240 L70 200 L60 160 L70 120 L60 80 L80 40 Z"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            
            {/* City markers */}
            {vietnameseCities.slice(0, 8).map((city, index) => {
              const x = 60 + (index % 3) * 30 + Math.random() * 20;
              const y = 40 + Math.floor(index / 3) * 60 + Math.random() * 20;
              const isSelected = city.name === selectedCity;
              
              return (
                <g key={city.name}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 5}
                    fill={isSelected ? "#fbbf24" : "rgba(255,255,255,0.8)"}
                    stroke={isSelected ? "#f59e0b" : "rgba(255,255,255,0.5)"}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-yellow-400 transition-all duration-200"
                    onClick={() => setSelectedCity(city.name)}
                  />
                  {isSelected && (
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="fill-white text-xs font-semibold"
                    >
                      {city.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Weather overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow"></div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-white/70 text-sm">
          {t('map.description')}
        </p>
      </div>
    </div>
  );
};

export default WeatherMap;