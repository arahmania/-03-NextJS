export default async function handler(req, res) {
  const apiKey = '8e1e648968d7c5da96e8d1efccbb001e';
  const city = req.query.city || 'Jakarta';
  const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const weatherData = await weatherRes.json();

  if (weatherRes.ok) {
    res.status(200).json(weatherData);
  } else {
    res.status(weatherData.cod).json({ message: weatherData.message });
  }
}
