import { useState } from 'react'

// A search form for a city name or US zip code.
// Props:
//   onSearch - function to call with the trimmed search text when the form
//              is submitted
//   disabled - true while a search is running; disables the button only, so
//              the user can still edit the text
export default function LocationSearch({ onSearch, disabled }) {
  // Controlled input: React state holds the text, and the input always
  // shows what is in state.
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    // Stop the browser from reloading the page, which is what a form
    // does on submit by default.
    event.preventDefault()

    const trimmed = query.trim()
    if (trimmed !== '') {
      onSearch(trimmed)
    }
  }

  return (
    <form className="location-search" onSubmit={handleSubmit}>
      <label htmlFor="location-input">City or zip code</label>
      <div className="location-search-row">
        <input
          id="location-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" disabled={disabled}>
          Search
        </button>
      </div>
    </form>
  )
}
