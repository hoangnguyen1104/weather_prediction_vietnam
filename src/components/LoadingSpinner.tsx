import React from 'react';
import { Cloud } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingSpinner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Cloud className="h-16 w-16 text-white animate-bounce mx-auto mb-4" />
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">{t('loading.title')}</h2>
        <p className="text-white/80 mb-6">{t('loading.message')}</p>
        
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;