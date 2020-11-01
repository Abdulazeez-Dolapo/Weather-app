export const getIconForUnit = (unitSystem = "metric") => {
	if (unitSystem === "metric") return "C"
	if (unitSystem === "imperial") return "F"
	if (unitSystem === "kelvin") return "K"
}
