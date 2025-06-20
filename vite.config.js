import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/weather_prediction_vietnam/',
  plugins: [react()],
}); 