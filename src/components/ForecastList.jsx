import ForecastCard from './ForecastCard.jsx'

// Open-Meteo sends daily data as parallel arrays: daily.time[0],
// daily.weather_code[0], daily.temperature_2m_max[0], ... all describe day 0.
// This combines them into one object per day, which is easier to render.
function toDays(daily) {
  return daily.time.map((date, i) => ({
    date,
    weatherCode: daily.weather_code[i],
    high: daily.temperature_2m_max[i],
    low: daily.temperature_2m_min[i],
    precipChance: daily.precipitation_probability_max[i],
  }))
}

// Shows the multi-day forecast.
// Props:
//   daily - the "daily" object from the forecast data
//   units - "imperial" or "metric"
export default function ForecastList({ daily, units }) {
  const days = toDays(daily)

  return (
    <section className="forecast" aria-labelledby="forecast-heading">
      <h2 id="forecast-heading">7-day forecast</h2>
      <ul className="forecast-list">
        {days.map((day) => (
          <li key={day.date}>
            <ForecastCard day={day} units={units} />
          </li>
        ))}
      </ul>
    </section>
  )
}
