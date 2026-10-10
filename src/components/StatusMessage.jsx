// The message to show for each search status. 'success' has no message,
// because the weather itself is shown instead.
const MESSAGES = {
  idle: 'Enter a city or ZIP code to see the weather.',
  locating: 'Finding location...',
  loading: 'Loading weather...',
  success: '',
}

// Shows one line of text that tells the user what the search is doing.
// Props:
//   status - 'idle', 'locating', 'loading', or 'success'
export default function StatusMessage({ status }) {
  // The paragraph stays on the page even when it is empty. Screen readers
  // watch an aria-live region for text changes, and the region has to
  // exist before the text changes for the announcement to happen.
  return (
    <p className="status-message" aria-live="polite">
      {MESSAGES[status]}
    </p>
  )
}
