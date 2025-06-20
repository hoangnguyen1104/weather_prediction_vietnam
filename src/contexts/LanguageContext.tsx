import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'app.title': 'Vietnam Weather',
    'app.subtitle': 'Real-time & Forecast',
    
    // Main page
    'main.title': 'Vietnam Weather',
    'main.description': 'Dữ liệu thời tiết thời gian thực và dự báo chính xác cho tất cả các thành phố và thị trấn trên khắp Việt Nam',
    
    // Search
    'search.placeholder': 'Search for cities in Vietnam...',
    'search.no_results': 'No cities found matching',
    
    // Current Weather
    'current.error': 'Error loading weather data',
    'current.humidity': 'Humidity',
    'current.wind': 'Wind',
    'current.visibility': 'Visibility',
    'current.pressure': 'Pressure',
    'current.uv_index': 'UV Index',
    'current.feels_like': 'Feels like',
    
    // Forecast
    'forecast.title': 'Weather Forecast',
    'forecast.3_days': '3 Days',
    'forecast.5_days': '5 Days',
    'forecast.10_days': '10 Days',
    
    // Popular Cities
    'popular.title': 'Popular Cities',
    'popular.description': 'Real-time weather data for 20+ Vietnamese cities',
    
    // Weather Map
    'map.title': 'Weather Map',
    'map.description': 'Click on cities to view their weather',
    
    // Loading
    'loading.title': 'Vietnam Weather',
    'loading.message': 'Loading weather data...',
    
    // Days of week
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sunday': 'Sunday',
  },
  vi: {
    // Header
    'app.title': 'Thời Tiết Việt Nam',
    'app.subtitle': 'Thời gian thực & Dự báo',
    
    // Main page
    'main.title': 'Thời Tiết Việt Nam',
    'main.description': 'Dữ liệu thời tiết thời gian thực và dự báo chính xác cho tất cả các thành phố và thị trấn trên khắp Việt Nam',
    
    // Search
    'search.placeholder': 'Tìm kiếm thành phố tại Việt Nam...',
    'search.no_results': 'Không tìm thấy thành phố nào phù hợp với',
    
    // Current Weather
    'current.error': 'Lỗi khi tải dữ liệu thời tiết',
    'current.humidity': 'Độ ẩm',
    'current.wind': 'Gió',
    'current.visibility': 'Tầm nhìn',
    'current.pressure': 'Áp suất',
    'current.uv_index': 'Chỉ số UV',
    'current.feels_like': 'Cảm giác như',
    
    // Forecast
    'forecast.title': 'Dự báo thời tiết',
    'forecast.3_days': '3 ngày',
    'forecast.5_days': '5 ngày',
    'forecast.10_days': '10 ngày',
    
    // Popular Cities
    'popular.title': 'Thành phố phổ biến',
    'popular.description': 'Dữ liệu thời tiết thời gian thực cho hơn 20 thành phố Việt Nam',
    
    // Weather Map
    'map.title': 'Bản đồ thời tiết',
    'map.description': 'Nhấp vào thành phố để xem thời tiết',
    
    // Loading
    'loading.title': 'Thời Tiết Việt Nam',
    'loading.message': 'Đang tải dữ liệu thời tiết...',
    
    // Days of week
    'day.monday': 'Thứ Hai',
    'day.tuesday': 'Thứ Ba',
    'day.wednesday': 'Thứ Tư',
    'day.thursday': 'Thứ Năm',
    'day.friday': 'Thứ Sáu',
    'day.saturday': 'Thứ Bảy',
    'day.sunday': 'Chủ Nhật',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};