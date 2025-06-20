import React from 'react';
import { TrendingUp, MapPin } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useLanguage } from '../contexts/LanguageContext';
import { vietnameseCities } from '../data/weatherData';

const PopularCities: React.FC = () => {
  const { selectedCity, setSelectedCity } = useWeather();
  const { t, language } = useLanguage();

  const popularCities = [
    { vi: 'Thành phố Hồ Chí Minh', en: 'Ho Chi Minh City' },
    { vi: 'Hà Nội', en: 'Hanoi' },
    { vi: 'Đà Nẵng', en: 'Da Nang' },
    { vi: 'Hải Phòng', en: 'Hai Phong' },
    { vi: 'Cần Thơ', en: 'Can Tho' },
    { vi: 'Nha Trang', en: 'Nha Trang' },
    { vi: 'Huế', en: 'Hue' },
    { vi: 'Vũng Tàu', en: 'Vung Tau' },
  ];

  // Mock temperature data for popular cities
  const getCityTemperature = (cityName: string) => {
    return Math.round(22 + Math.random() * 15);
  };

  const getCityCondition = (cityName: string) => {
    const conditions = ['☀️', '⛅', '☁️', '🌧️'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  return (
    <div className="weather-card animate-slide-up">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-white" />
        <h3 className="text-lg font-bold text-white">{t('popular.title')}</h3>
      </div>

      <div className="space-y-2">
        {popularCities.map((city, index) => (
          <button
            key={city.en}
            onClick={() => setSelectedCity(language === 'vi' ? city.vi : city.en)}
            className={`w-full p-3 rounded-xl transition-all duration-200 animate-slide-up ${
              selectedCity === city.vi || selectedCity === city.en
                ? 'bg-white/30 border border-white/40'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-white/70" />
                <span className="text-white font-medium">{language === 'vi' ? city.vi : city.en}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getCityCondition(language === 'vi' ? city.vi : city.en)}</span>
                <span className="text-white font-semibold">
                  {getCityTemperature(language === 'vi' ? city.vi : city.en)}°C
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/10 rounded-xl">
        <p className="text-white/70 text-sm text-center">
          {t('popular.description')}
        </p>
      </div>
    </div>
  );
};

export default PopularCities;