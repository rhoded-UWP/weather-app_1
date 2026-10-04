import { useState } from 'react'
import mockWeather from './data/mockWeather.json'
import CitySelector from './components/CitySelector.jsx'
import CurrentConditions from './components/CurrentConditions.jsx'
import ForecastList from './components/ForecastList.jsx'

// Module 8: show sample data from a local JSON file (no fetching).
// Units are always Imperial for now.
export default function App() {
  const locations = mockWeather.locations

  // State holds only the id. The full location object is looked up below,
  // so the data lives in one place and can't get out of sync.
  const [selectedId, setSelectedId] = useState(locations[0].id)
  const location = locations.find((loc) => loc.id === selectedId)
  const units = 'imperial'

  return (
    <main className="app">
      <h1>Weather App</h1>
      <p className="sample-badge">Sample data</p>

      <CitySelector
        locations={locations}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <CurrentConditions
        name={location.name}
        region={location.admin1}
        current={location.forecast.current}
        units={units}
      />

      <ForecastList daily={location.forecast.daily} units={units} />
    </main>
  )
}
