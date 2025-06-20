import React from 'react';
import { Cloud, RefreshCw, Settings, Languages } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { refreshWeather, isLoading } = useWeather();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <header className="glass-effect border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{t('app.title')}</h1>
              <p className="text-sm text-white/70">{t('app.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200"
              title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
            >
              <Languages className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-medium">
                {language === 'en' ? 'VI' : 'EN'}
              </span>
            </button>
            
            <button
              onClick={refreshWeather}
              disabled={isLoading}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 text-white ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200">
              <Settings className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;