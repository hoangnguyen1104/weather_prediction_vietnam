import React, { useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useLanguage } from '../contexts/LanguageContext';
import ForecastChart from './ForecastChart';
import ForecastList from './ForecastList';

const ForecastTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3' | '5' | '10'>('5');
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
  const { forecast, isLoading } = useWeather();
  const { t } = useLanguage();

  const tabs = [
    { key: '3' as const, label: t('forecast.3_days'), days: 3 },
    { key: '5' as const, label: t('forecast.5_days'), days: 5 },
    { key: '10' as const, label: t('forecast.10_days'), days: 10 },
  ];

  const filteredForecast = forecast.slice(0, parseInt(activeTab));

  if (isLoading) {
    return (
      <div className="weather-card animate-pulse">
        <div className="h-64 bg-white/20 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="weather-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{t('forecast.title')}</h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'chart' : 'list')}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200"
          >
            {viewMode === 'list' ? (
              <TrendingUp className="h-4 w-4 text-white" />
            ) : (
              <Calendar className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="flex space-x-1 mb-6 bg-white/10 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {viewMode === 'list' ? (
        <ForecastList forecast={filteredForecast} />
      ) : (
        <ForecastChart forecast={filteredForecast} />
      )}
    </div>
  );
};

export default ForecastTabs;