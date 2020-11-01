import React from "react"
import { View, Text, StyleSheet } from "react-native"

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"

import { colors } from "../utils/colors"
import { getIconForUnit } from "../utils/helpers"

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function WeatherDetails({ currentWeather, unitSystem }) {
	const {
		main: { feels_like, humidity, pressure },
		wind: { speed },
	} = currentWeather

	const getTemperatureIconName = () => {
		if (unitSystem === "metric") {
			return currentWeather.feels_like > 33
				? "temperature-high"
				: "temperature-low"
		}

		if (unitSystem === "imperial") {
			return currentWeather.feels_like > 91.4
				? "temperature-high"
				: "temperature-low"
		}

		if (unitSystem === "kelvin") {
			return currentWeather.feels_like > 306
				? "temperature-high"
				: "temperature-low"
		}
	}

	const windSpeed =
		unitSystem === "metric" ? `${speed} m/s` : `${speed} miles/hr`

	return (
		<View style={styles.weatherDetails}>
			<View style={styles.row}>
				<View
					style={{
						...styles.box,
						borderRightWidth: 1,
						borderRightColor: BORDER_COLOR,
					}}
				>
					<View style={styles.row}>
						<FontAwesome5
							name={getTemperatureIconName()}
							size={25}
							color={PRIMARY_COLOR}
						/>

						<View style={styles.items}>
							<Text>Feels like:</Text>
							<Text style={styles.textSecondary}>
								{feels_like}&#176;{getIconForUnit(unitSystem)}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.box}>
					<View style={styles.row}>
						<MaterialCommunityIcons
							name="water"
							size={30}
							color={PRIMARY_COLOR}
						/>

						<View style={styles.items}>
							<Text>Humidity:</Text>
							<Text style={styles.textSecondary}>{humidity}%</Text>
						</View>
					</View>
				</View>
			</View>

			<View
				style={{
					...styles.row,
					borderTopWidth: 1,
					borderTopColor: BORDER_COLOR,
				}}
			>
				<View
					style={{
						...styles.box,
						borderRightWidth: 1,
						borderRightColor: BORDER_COLOR,
					}}
				>
					<View style={styles.row}>
						<MaterialCommunityIcons
							name="weather-windy"
							size={30}
							color={PRIMARY_COLOR}
						/>

						<View style={styles.items}>
							<Text>Wind Speed:</Text>
							<Text style={styles.textSecondary}>{windSpeed}</Text>
						</View>
					</View>
				</View>

				<View style={styles.box}>
					<View style={styles.row}>
						<MaterialCommunityIcons
							name="speedometer"
							size={30}
							color={PRIMARY_COLOR}
						/>

						<View style={styles.items}>
							<Text>Pressure:</Text>
							<Text style={styles.textSecondary}>{pressure} hPa</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	weatherDetails: {
		margin: 15,
		borderWidth: 1,
		borderColor: BORDER_COLOR,
		borderRadius: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	box: {
		flex: 1,
		padding: 20,
	},
	items: {
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	textSecondary: {
		fontSize: 15,
		fontWeight: "700",
		color: SECONDARY_COLOR,
		margin: 7,
	},
})
