import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, ActivityIndicator } from "react-native"
import * as Location from "expo-location"

import { fetchWeatherReport } from "./services/weather"
import { colors } from "./utils/colors"

import WeatherInfo from "./components/WeatherInfo"
import UnitsPicker from "./components/UnitsPicker"
import ReloadIcon from "./components/ReloadIcon"
import WeatherDetails from "./components/WeatherDetails"

export default function App() {
	const [errorMessage, setErrorMessage] = useState(null)
	const [currentWeather, setCurrentWeather] = useState(null)
	const [unitSystem, setUnitSystem] = useState("metric")

	useEffect(() => {
		load()
	}, [unitSystem])

	async function load() {
		setCurrentWeather(null)
		setErrorMessage(null)

		try {
			let { status } = await Location.requestPermissionsAsync()

			if (status !== "granted") {
				return setErrorMessage("Access denied for location")
			}

			const location = await Location.getCurrentPositionAsync()
			const { latitude, longitude } = location.coords

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
		return (
			<View style={styles.container}>
				<StatusBar style="auto" />
				<View style={styles.main}>
					<UnitsPicker
						unitSystem={unitSystem}
						setUnitSystem={setUnitSystem}
					/>
					<ReloadIcon load={load} />
					<WeatherInfo
						unitSystem={unitSystem}
						currentWeather={currentWeather}
					/>
				</View>

				<View>
					<WeatherDetails
						currentWeather={currentWeather}
						unitSystem={unitSystem}
					/>
				</View>
			</View>
		)
	} else if (errorMessage) {
		return (
			<View style={styles.container}>
				<ReloadIcon load={load} />
				<Text style={{ textAlign: "center" }}>{errorMessage}</Text>
				<StatusBar style="auto" />
			</View>
		)
	} else {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
				<StatusBar style="auto" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	main: {
		flex: 1,
		justifyContent: "center",
	},
})
