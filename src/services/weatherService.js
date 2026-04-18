const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getByCity = async (city) => {
  if (!API_KEY) {
    console.error("API Key is missing! Check your .env file.");
  }

  const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('City not found or API error');
  }
  
  return await response.json();
};