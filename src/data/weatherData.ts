export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  icon: string;
  timestamp: Date;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
}

export const vietnameseCities = [
  { name: 'Thành phố Hồ Chí Minh', coordinates: { lat: 10.8231, lon: 106.6297 } },
  { name: 'Hà Nội', coordinates: { lat: 21.0285, lon: 105.8542 } },
  { name: 'Đà Nẵng', coordinates: { lat: 16.0544, lon: 108.2022 } },
  { name: 'Hải Phòng', coordinates: { lat: 20.8449, lon: 106.6881 } },
  { name: 'Cần Thơ', coordinates: { lat: 10.0452, lon: 105.7469 } },
  { name: 'Biên Hòa', coordinates: { lat: 10.9460, lon: 106.8234 } },
  { name: 'Huế', coordinates: { lat: 16.4637, lon: 107.5909 } },
  { name: 'Nha Trang', coordinates: { lat: 12.2388, lon: 109.1967 } },
  { name: 'Buôn Ma Thuột', coordinates: { lat: 12.6667, lon: 108.0500 } },
  { name: 'Quy Nhơn', coordinates: { lat: 13.7563, lon: 109.2297 } },
  { name: 'Vũng Tàu', coordinates: { lat: 10.3460, lon: 107.0843 } },
  { name: 'Thái Nguyên', coordinates: { lat: 21.5944, lon: 105.8480 } },
  { name: 'Long Xuyên', coordinates: { lat: 10.3871, lon: 105.4368 } },
  { name: 'Thanh Hóa', coordinates: { lat: 19.8000, lon: 105.7667 } },
  { name: 'Thái Bình', coordinates: { lat: 20.4500, lon: 106.3333 } },
  { name: 'Nam Định', coordinates: { lat: 20.4167, lon: 106.1667 } },
  { name: 'Phan Thiết', coordinates: { lat: 10.9289, lon: 108.1022 } },
  { name: 'Cam Ranh', coordinates: { lat: 11.9214, lon: 109.1591 } },
  { name: 'Vinh', coordinates: { lat: 18.6667, lon: 105.6833 } },
  { name: 'Mỹ Tho', coordinates: { lat: 10.3600, lon: 106.3600 } },
];

export const weatherConditions = {
  'clear': { icon: '☀️', color: 'from-yellow-400 to-orange-500' },
  'partly-cloudy': { icon: '⛅', color: 'from-blue-400 to-gray-400' },
  'cloudy': { icon: '☁️', color: 'from-gray-400 to-gray-600' },
  'overcast': { icon: '☁️', color: 'from-gray-500 to-gray-700' },
  'rain': { icon: '🌧️', color: 'from-blue-500 to-blue-700' },
  'heavy-rain': { icon: '⛈️', color: 'from-blue-600 to-purple-700' },
  'thunderstorm': { icon: '⛈️', color: 'from-purple-600 to-gray-800' },
  'snow': { icon: '❄️', color: 'from-blue-200 to-white' },
  'fog': { icon: '🌫️', color: 'from-gray-300 to-gray-500' },
  'mist': { icon: '🌫️', color: 'from-gray-200 to-gray-400' },
};