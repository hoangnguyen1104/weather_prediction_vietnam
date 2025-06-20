import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useLanguage } from '../contexts/LanguageContext';
import { vietnameseCities } from '../data/weatherData';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setSelectedCity } = useWeather();
  const { t } = useLanguage();

  const filteredCities = vietnameseCities.filter(city =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto animate-slide-up">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
        <input
          type="text"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
        />
      </div>

      {showSuggestions && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl z-50 max-h-60 overflow-y-auto scrollbar-hide">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city.name}
                onClick={() => handleCitySelect(city.name)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-3 first:rounded-t-2xl last:rounded-b-2xl"
              >
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-gray-800 font-medium">{city.name}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              {t('search.no_results')} "{query}"
            </div>
          )}
        </div>
      )}

      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;