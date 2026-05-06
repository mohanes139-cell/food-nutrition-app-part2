import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) {
      setValidationError("Search cannot be empty.");
      return;
    }

    if (query.trim().length < 2) {
      setValidationError("Search must be at least 2 characters.");
      return;
    }

    setValidationError("");
    onSearch(query.trim());
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search food products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {validationError && (
        <ErrorMessage message={validationError} />
      )}
    </>
  );
}

export default SearchBar;
