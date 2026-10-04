import { describeWeather } from '../data/weatherCodes.js'
import { formatTemperature, formatWind } from '../utils/units.js'

// Shows the current weather for one location.
// Props:
//   name    - city name, e.g. "Platteville"
//   region  - state name (admin1), e.g. "Wisconsin"
//   current - the "current" object from the forecast data
//   units   - "imperial" or "metric"
export default function CurrentConditions({ name, region, current, units }) {
  const { label, icon } = describeWeather(current.weather_code)

  return (
    <section className="current-conditions" aria-labelledby="current-heading">
      <h2 id="current-heading">
        Current conditions in {name}, {region}
      </h2>

      <p className="current-temp">
        {formatTemperature(current.temperature_2m, units)}
      </p>

      <p className="current-condition">
        {label} <span aria-hidden="true">({icon})</span>
      </p>

      <dl className="current-details">
        <div>
          <dt>Feels like</dt>
          <dd>{formatTemperature(current.apparent_temperature, units)}</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{current.relative_humidity_2m}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{formatWind(current.wind_speed_10m, units)}</dd>
        </div>
      </dl>
    </section>
  )
}
