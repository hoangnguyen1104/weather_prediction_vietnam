import React, { useState } from 'react';
import { Droplets, Wind } from 'lucide-react';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useLanguage } from '../contexts/LanguageContext';
import { ForecastData } from '../data/weatherData';

interface ForecastListProps {
  forecast: ForecastData[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const { language, t } = useLanguage();
  const dateLocale = language === 'vi' ? vi : enUS;
  const [selectedDay, setSelectedDay] = useState<ForecastData | null>(null);

  return (
    <div className="space-y-3">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 animate-slide-up cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => setSelectedDay(day)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{day.icon}</span>
              <div>
                <div className="text-white font-semibold">
                  {format(day.date, 'EEEE, MMM dd', { locale: dateLocale })}
                </div>
                <div className="text-white/70 text-sm capitalize">
                  {day.description}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-white/70">
                <div className="flex items-center space-x-1">
                  <Droplets className="h-3 w-3" />
                  <span>{day.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="h-3 w-3" />
                  <span>{day.windSpeed} km/h</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-white font-bold text-lg">
                  {day.temperature.max}°
                </div>
                <div className="text-white/70 text-sm">
                  {day.temperature.min}°
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedDay(null)}>
          <div className="bg-white rounded-xl p-6 min-w-[320px] max-w-[90vw] shadow-xl relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setSelectedDay(null)}>&times;</button>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl">{selectedDay.icon}</span>
              <div>
                <div className="text-xl font-bold">{format(selectedDay.date, 'EEEE, MMM dd', { locale: dateLocale })}</div>
                <div className="text-gray-600 text-sm capitalize">{selectedDay.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="font-semibold">{language === 'vi' ? 'Nhiệt độ cao nhất' : 'Max temperature'}:</span> {selectedDay.temperature.max}°C</div>
              <div><span className="font-semibold">{language === 'vi' ? 'Nhiệt độ thấp nhất' : 'Min temperature'}:</span> {selectedDay.temperature.min}°C</div>
              <div><span className="font-semibold">{t('current.humidity')}:</span> {selectedDay.humidity}%</div>
              <div><span className="font-semibold">{t('current.wind')}:</span> {selectedDay.windSpeed} km/h</div>
              <div><span className="font-semibold">{language === 'vi' ? 'Lượng mưa' : 'Precipitation'}:</span> {selectedDay.precipitation} mm</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastList;