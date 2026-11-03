export type Weather = {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
};

type WeatherResponse = {
  success: boolean;
  data: Weather;
};

const API_URL = import.meta.env.VITE_API_URL;

export const getWeather = async (city: string): Promise<Weather> => {
  const response = await fetch(
    `${API_URL}/api/weather?city=${encodeURIComponent(city)}`
  );

  const result: WeatherResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error("Failed to fetch weather");
  }

  return result.data;
};