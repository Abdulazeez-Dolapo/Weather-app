const WEATHER_API_KEY = "87e8a9b28ffd5b17659cc75070597a22"
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`

export const fetchWeatherReport = queryParams => {
	return fetch(`${BASE_URL}${queryParams}&appid=${WEATHER_API_KEY}`)
}
