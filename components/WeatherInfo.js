import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { colors } from "../utils"

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({ currentWeather, unitSystem }) {
	const {
		main: { temp },
		weather: [details],
		name,
	} = currentWeather

	const { icon, main, description } = details
	const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

	const getIconForUnit = () => {
		if (unitSystem === "metric") return "C"
		if (unitSystem === "imperial") return "F"
		if (unitSystem === "kelvin") return "K"
	}

	return (
		<View style={styles.weatherInfo}>
			<Text>{name}</Text>
			<Image style={styles.icon} source={{ uri: iconUrl }} />
			<Text style={styles.textPrimary}>
				{temp}&#176;
				{getIconForUnit()}
			</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.textSecondary}>{main}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	weatherInfo: {
		alignItems: "center",
	},
	icon: {
		width: 100,
		height: 100,
	},
	description: {
		textTransform: "capitalize",
	},
	textPrimary: {
		fontSize: 40,
		color: PRIMARY_COLOR,
	},
	textSecondary: {
		fontSize: 20,
		color: SECONDARY_COLOR,
		fontWeight: "500",
		marginTop: 10,
	},
})
