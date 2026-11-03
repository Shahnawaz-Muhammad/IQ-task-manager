import type { Request, Response } from "express";

export const getWeatherController = async (req: Request, res: Response) => {
  const city = req.query.city;

  if (typeof city !== "string" || !city.trim()) {
    res.status(400).json({
      success: false,
      message: "Please provide a city query parameter",
    });
    return;
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    res.status(500).json({
      success: false,
      message: "Weather service is not configured",
    });
    return;
  }

  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("q", city.trim());
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", "metric");

    const weatherResponse = await fetch(url);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      res.status(weatherResponse.status === 404 ? 404 : 502).json({
        success: false,
        message:
          weatherResponse.status === 404
            ? "City not found"
            : "Weather service request failed",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0]?.description ?? "Unavailable",
        humidity: weatherData.main.humidity,
      },
    });
  } catch {
    res.status(502).json({
      success: false,
      message: "Could not reach the weather service",
    });
  }
};