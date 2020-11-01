import { WEATHER_API_KEY } from "react-native-dotenv"

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`

console.log({ WEATHER_API_KEY })
export const fetchWeatherReport = queryParams => {
	return fetch(`${BASE_URL}${queryParams}&appid=${WEATHER_API_KEY}`)
}
