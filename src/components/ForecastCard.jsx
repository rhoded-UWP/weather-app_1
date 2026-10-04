import { describeWeather } from '../data/weatherCodes.js'
import { formatTemperature } from '../utils/units.js'

// Turns "2026-10-26" into "Monday, Oct 26".
// Adding "T00:00" makes JavaScript read the date in local time. Without it,
// a date-only string is read as UTC midnight, which can show the previous
// day for users west of UTC.
function formatDay(dateString) {
  const date = new Date(`${dateString}T00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

// Shows one day's forecast.
// Props:
//   day   - { date, weatherCode, high, low, precipChance }
//   units - "imperial" or "metric"
export default function ForecastCard({ day, units }) {
  const { label, icon } = describeWeather(day.weatherCode)

  return (
    <article className="forecast-card">
      <h3>{formatDay(day.date)}</h3>
      <p className="forecast-condition">
        <span aria-hidden="true">{icon}</span> {label}
      </p>
      <p>
        High: {formatTemperature(day.high, units)}
        {' / '}
        Low: {formatTemperature(day.low, units)}
      </p>
      <p>Precipitation chance: {day.precipChance}%</p>
      {day.precipChance >= 60 && (
        <p className="umbrella-tip">Bring an umbrella</p>
      )}
    </article>
  )
}
