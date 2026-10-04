// Formatting helpers for temperature and wind.
// The app always stores values in Imperial (°F, mph) and derives Metric
// only when it is time to display them.

// Formats a Fahrenheit temperature for display, e.g. "48°F" or "9°C".
export function formatTemperature(fahrenheit, units) {
  if (units === 'metric') {
    const celsius = ((fahrenheit - 32) * 5) / 9
    return `${Math.round(celsius)}°C`
  }
  return `${Math.round(fahrenheit)}°F`
}

// Formats a wind speed in mph for display, e.g. "12 mph" or "19 km/h".
export function formatWind(mph, units) {
  if (units === 'metric') {
    const kmh = mph * 1.609344
    return `${Math.round(kmh)} km/h`
  }
  return `${Math.round(mph)} mph`
}
