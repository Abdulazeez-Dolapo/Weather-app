import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { Picker } from "@react-native-community/picker"

export default function UnitsPicker({ unitSystem, setUnitSystem }) {
	return (
		<View style={styles.picker}>
			<Picker
				selectedValue={unitSystem}
				onValueChange={item => setUnitSystem(item)}
				mode="dropdown"
				itemStyle={{ fontSize: 12 }}
			>
				<Picker.Item label="Celsius" value="metric" />
				<Picker.Item label="Fahrenheit" value="imperial" />
				<Picker.Item label="Kelvin" value="kelvin" />
			</Picker>
		</View>
	)
}

const styles = StyleSheet.create({
	picker: {
		position: "absolute",
		...Platform.select({
			ios: {
				top: -20,
			},
			android: {
				top: 60,
			},
		}),
		left: 20,
		height: 50,
		width: 140,
	},
})
