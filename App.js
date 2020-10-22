import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import * as Location from "expo-location"

import { fetchWeatherReport } from "./services/weather"

export default function App() {
	const [errorMessage, setErrorMessage] = useState(null)
	const [currentWeather, setCurrentWeather] = useState(null)
	const [unitSystem, setUnitSystem] = useState("metric")

	useEffect(() => {
		load()
	}, [])

	async function load() {
		try {
			let { status } = await Location.requestPermissionsAsync()

			if (status !== "granted") {
				return setErrorMessage("Access denied for location")
			}

			const location = await Location.getCurrentPositionAsync()
			const { latitude, longitude } = location.coords

			// console.log({ latitude, longitude })
			const QUERY_PARAMS = `lat=${latitude}&lon=${longitude}&units=${unitSystem}`

			let response = await fetchWeatherReport(QUERY_PARAMS)
			const currentWeather = await response.json()

			if (!response.ok) {
				return setErrorMessage(currentWeather.message)
			}

			setCurrentWeather(currentWeather)

			console.log(currentWeather)
		} catch (error) {
			console.log("location", error)
			setErrorMessage(error)
		}
	}

	if (currentWeather) {
		console.log(currentWeather)
		const {
			main: { temp },
		} = currentWeather

		return (
			<View style={styles.container}>
				<Text>{temp}</Text>
				<StatusBar style="auto" />
			</View>
		)
	} else {
		return (
			<View style={styles.container}>
				<Text>{errorMessage}</Text>
				<StatusBar style="auto" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})
