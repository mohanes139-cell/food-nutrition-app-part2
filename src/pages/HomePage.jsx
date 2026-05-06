import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import ErrorMessage from "../components/ErrorMessage";
import useFoodSearch from "../hooks/useFoodSearch";

function HomePage({ onSave }) {
  const { products, loading, error, searchFood } = useFoodSearch();
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch(query) {
    setHasSearched(true);
    searchFood(query);
  }

  return (
    <main className="app">
      <h1>Food Nutrition Search</h1>

      <SearchBar onSearch={handleSearch} />

      {!hasSearched && !loading && (
        <p className="message">
          Search for a food product to get started.
        </p>
      )}

      {loading && (
        <p className="message">Loading products...</p>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && hasSearched && products.length > 0 && (
        <FoodList products={products} onSave={onSave} />
      )}

      {!loading &&
        hasSearched &&
        products.length === 0 &&
        !error && (
          <p className="message">No products found.</p>
        )}
    </main>
  );
}

export default HomePage;
