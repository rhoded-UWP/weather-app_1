// Credits Open-Meteo as the data source, as its license (CC BY 4.0) requires.
// Show this near the weather data.
export default function Attribution() {
  return (
    <p className="attribution">
      <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
      {' '}
      (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)
    </p>
  )
}
