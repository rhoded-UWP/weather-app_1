// Lets the user pick one of the sample locations.
// Props:
//   locations  - array of locations from the data file
//   selectedId - id of the location currently shown
//   onSelect   - function to call with a location's id when its button is clicked
export default function CitySelector({ locations, selectedId, onSelect }) {
  return (
    <div className="city-selector" role="group" aria-labelledby="city-label">
      <p id="city-label" className="city-label">Choose a city</p>
      <div className="city-buttons">
        {locations.map((location) => (
          <button
            key={location.id}
            type="button"
            aria-pressed={location.id === selectedId}
            onClick={() => onSelect(location.id)}
          >
            {location.name}, {location.admin1}
          </button>
        ))}
      </div>
    </div>
  )
}
