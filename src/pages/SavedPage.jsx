import FoodCard from "../components/FoodCard";

function SavedPage({ savedItems, onRemove }) {
  return (
    <main className="app">
      <h1>Saved Products</h1>

      {savedItems.length === 0 ? (
        <p className="message">No saved products yet.</p>
      ) : (
        <div className="food-list">
          {savedItems.map((product) => (
            <FoodCard
              key={product.code}
              product={product}
              onRemove={onRemove}
              showRemove={true}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default SavedPage;
