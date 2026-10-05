import { useState } from 'react'
import LocationSearch from './components/LocationSearch.jsx'
import CurrentConditions from './components/CurrentConditions.jsx'
import ForecastList from './components/ForecastList.jsx'
import Attribution from './components/Attribution.jsx'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// The same fields the Module 8 sample data used, so the display
// components work without changes.
const CURRENT_FIELDS =
  'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m'
const DAILY_FIELDS =
  'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'

// Module 9: search for a place, then load its live weather from Open-Meteo.
// Only the success path is handled so far. Not-found, HTTP errors, and
// network errors come in the next lesson. Units are always Imperial for now.
export default function App() {
  // One status string instead of several true/false flags, so the app is
  // always in exactly one state: 'idle', 'locating', 'loading', or 'success'.
  const [status, setStatus] = useState('idle')
  const [place, setPlace] = useState(null)
  const [forecast, setForecast] = useState(null)
  const units = 'imperial'

  // async lets us use await, which pauses this function until each
  // request finishes, so the two requests read top to bottom in order.
  async function handleSearch(query) {
    setStatus('locating')

    // Request 1: turn the city name or zip code into a place.
    const geoResponse = await fetch(
      `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&countryCode=US`
    )
    const geoData = await geoResponse.json()
    const foundPlace = geoData.results[0]

    setStatus('loading')

    // Request 2: get the weather for that place's coordinates.
    const forecastResponse = await fetch(
      `${FORECAST_URL}?latitude=${foundPlace.latitude}` +
        `&longitude=${foundPlace.longitude}` +
        `&current=${CURRENT_FIELDS}` +
        `&daily=${DAILY_FIELDS}` +
        '&temperature_unit=fahrenheit&wind_speed_unit=mph' +
        '&timezone=auto&forecast_days=7'
    )
    const forecastData = await forecastResponse.json()

    // Save the place and its weather together, so the heading never shows
    // a new city name above an old forecast.
    setPlace(foundPlace)
    setForecast(forecastData)
    setStatus('success')
  }

  const isBusy = status === 'locating' || status === 'loading'

  return (
    <main className="app">
      <h1>Weather App</h1>

      <LocationSearch onSearch={handleSearch} disabled={isBusy} />

      {status === 'success' && (
        <>
          <CurrentConditions
            name={place.name}
            region={place.admin1}
            current={forecast.current}
            units={units}
          />

          <ForecastList daily={forecast.daily} units={units} />

          <Attribution />
        </>
      )}
    </main>
  )
}
