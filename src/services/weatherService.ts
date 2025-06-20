import { WeatherData, ForecastData, vietnameseCities } from '../data/weatherData';
import { useLanguage } from '../contexts/LanguageContext';

// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key'; // Sử dụng biến môi trường
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Thêm khai báo cho biến môi trường nếu chưa có
declare global {
  interface ImportMeta {
    env: {
      VITE_OPENWEATHER_API_KEY?: string;
      [key: string]: any;
    };
  }
}

console.log('[DEBUG] VITE_OPENWEATHER_API_KEY:', API_KEY);

class WeatherService {
  private generateMockWeatherData(cityName: string, language: 'en' | 'vi' = 'en'): WeatherData {
    const city = vietnameseCities.find(c => c.name.toLowerCase() === cityName.toLowerCase()) 
      || vietnameseCities[0];
    
    const conditions = ['clear', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      city: city.name,
      country: 'Vietnam',
      temperature: Math.round(22 + Math.random() * 15), // 22-37°C typical for Vietnam
      condition,
      description: this.getWeatherDescription(condition, language),
      humidity: Math.round(60 + Math.random() * 35), // 60-95%
      windSpeed: Math.round(5 + Math.random() * 15), // 5-20 km/h
      windDirection: this.getRandomWindDirection(),
      pressure: Math.round(1010 + Math.random() * 20), // 1010-1030 hPa
      visibility: Math.round(8 + Math.random() * 7), // 8-15 km
      uvIndex: Math.round(3 + Math.random() * 8), // 3-11
      feelsLike: Math.round(24 + Math.random() * 18), // Feels like temperature
      icon: this.getWeatherIcon(condition),
      timestamp: new Date(),
      coordinates: city.coordinates,
    };
  }

  private generateMockForecastData(days: number, language: 'en' | 'vi' = 'en'): ForecastData[] {
    const forecast: ForecastData[] = [];
    const conditions = ['clear', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm'];
    
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      const minTemp = Math.round(20 + Math.random() * 8);
      const maxTemp = minTemp + Math.round(5 + Math.random() * 10);
      
      forecast.push({
        date,
        temperature: {
          min: minTemp,
          max: maxTemp,
        },
        condition,
        description: this.getWeatherDescription(condition, language),
        humidity: Math.round(60 + Math.random() * 35),
        windSpeed: Math.round(5 + Math.random() * 15),
        precipitation: condition.includes('rain') ? Math.round(Math.random() * 20) : 0,
        icon: this.getWeatherIcon(condition),
      });
    }
    
    return forecast;
  }

  private getWeatherDescription(condition: string, language: 'en' | 'vi' = 'en'): string {
    const descriptions = {
      en: {
        'clear': 'Clear sky',
        'partly-cloudy': 'Partly cloudy',
        'cloudy': 'Cloudy',
        'overcast': 'Overcast',
        'rain': 'Light rain',
        'heavy-rain': 'Heavy rain',
        'thunderstorm': 'Thunderstorm',
        'snow': 'Snow',
        'fog': 'Fog',
        'mist': 'Mist',
      },
      vi: {
        'clear': 'Trời quang',
        'partly-cloudy': 'Có mây nhẹ',
        'cloudy': 'Nhiều mây',
        'overcast': 'U ám',
        'rain': 'Mưa nhẹ',
        'heavy-rain': 'Mưa to',
        'thunderstorm': 'Dông',
        'snow': 'Tuyết',
        'fog': 'Sương mù',
        'mist': 'Sương mù nhẹ',
      }
    };
    return descriptions[language][condition as keyof typeof descriptions['en']] || (language === 'vi' ? 'Không xác định' : 'Unknown');
  }

  private getWeatherIcon(condition: string): string {
    const icons = {
      'clear': '☀️',
      'partly-cloudy': '⛅',
      'cloudy': '☁️',
      'overcast': '☁️',
      'rain': '🌧️',
      'heavy-rain': '⛈️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'fog': '🌫️',
      'mist': '🌫️',
    };
    return icons[condition as keyof typeof icons] || '☀️';
  }

  private getRandomWindDirection(): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  private async fetchWeatherApi(url: string) {
    console.log('[DEBUG] Fetching URL:', url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error('[DEBUG] API error:', response.status, response.statusText);
      throw new Error('API error');
    }
    const data = await response.json();
    console.log('[DEBUG] Raw API response:', data);
    return data;
  }

  private mapWeatherCondition(apiMain: string): string {
    // Map OpenWeatherMap main to our condition keys
    switch (apiMain.toLowerCase()) {
      case 'clear': return 'clear';
      case 'clouds': return 'cloudy';
      case 'rain': return 'rain';
      case 'thunderstorm': return 'thunderstorm';
      case 'drizzle': return 'rain';
      case 'snow': return 'snow';
      case 'mist':
      case 'fog': return 'fog';
      case 'haze':
      case 'smoke': return 'mist';
      case 'overcast clouds': return 'overcast';
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds': return 'partly-cloudy';
      default: return 'clear';
    }
  }

  private getWindDirection(degree: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degree / 45) % 8];
  }

  private transformWeatherData(apiData: any, language: 'en' | 'vi'): WeatherData {
    const condition = this.mapWeatherCondition(apiData.weather[0].main);
    const result = {
      city: apiData.name,
      country: apiData.sys.country,
      temperature: Math.round(apiData.main.temp),
      condition,
      description: this.getWeatherDescription(condition, language),
      humidity: apiData.main.humidity,
      windSpeed: Math.round(apiData.wind.speed * 3.6), // m/s to km/h
      windDirection: this.getWindDirection(apiData.wind.deg),
      pressure: apiData.main.pressure,
      visibility: Math.round(apiData.visibility / 1000),
      uvIndex: 0, // UV index cần API khác
      feelsLike: Math.round(apiData.main.feels_like),
      icon: this.getWeatherIcon(condition),
      timestamp: new Date(apiData.dt * 1000),
      coordinates: {
        lat: apiData.coord.lat,
        lon: apiData.coord.lon,
      },
    };
    console.log('[DEBUG] Transformed WeatherData:', result);
    return result;
  }

  private transformForecastData(apiData: any, language: 'en' | 'vi'): ForecastData[] {
    const daily: { [date: string]: any[] } = {};
    apiData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      if (!daily[day]) daily[day] = [];
      daily[day].push(item);
    });
    const result = Object.values(daily).slice(0, 10).map((items: any[]) => {
      const mid = Math.floor(items.length / 2);
      const item = items[mid];
      const temps = items.map(i => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const condition = this.mapWeatherCondition(item.weather[0].main);
      return {
        date: new Date(item.dt * 1000),
        temperature: { min: Math.round(min), max: Math.round(max) },
        condition,
        description: this.getWeatherDescription(condition, language),
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6),
        precipitation: item.rain ? Math.round(item.rain['3h'] || 0) : 0,
        icon: this.getWeatherIcon(condition),
      };
    });
    console.log('[DEBUG] Transformed ForecastData:', result);
    return result;
  }

  async getCurrentWeather(cityName: string, language: 'en' | 'vi' = 'en'): Promise<WeatherData> {
    try {
      const url = `${BASE_URL}/weather?q=${encodeURIComponent(cityName)},VN&appid=${API_KEY}&units=metric&lang=${language}`;
      const data = await this.fetchWeatherApi(url);
      console.log('[DEBUG] CurrentWeather API data:', data);
      const result = this.transformWeatherData(data, language);
      return result;
    } catch (error) {
      console.error('[DEBUG] getCurrentWeather error:', error);
      throw error;
    }
  }

  async getForecast(cityName: string, days: number = 10, language: 'en' | 'vi' = 'en'): Promise<ForecastData[]> {
    try {
      const url = `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)},VN&appid=${API_KEY}&units=metric&lang=${language}`;
      const data = await this.fetchWeatherApi(url);
      console.log('[DEBUG] Forecast API data:', data);
      const result = this.transformForecastData(data, language).slice(0, days);
      return result;
    } catch (error) {
      console.error('[DEBUG] getForecast error:', error);
      throw error;
    }
  }
}

export const weatherService = new WeatherService();