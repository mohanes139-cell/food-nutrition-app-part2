import { Link } from "react-router-dom";

function FoodCard({
  product,
  onSave,
  onRemove,
  showRemove = false,
}) {
  const nutriments = product?.nutriments;

  return (
    <div className="food-card">
      <Link to={`/product/${product.code}`}>
        <img
          src={
            product?.image_front_url ||
            product?.image_url ||
            "https://placehold.co/150x150?text=No+Image"
          }
          alt={product?.product_name || "Food"}
        />

        <h2>
          {product?.product_name || "Unnamed Product"}
        </h2>
      </Link>

      <p>
        <strong>Brand:</strong>{" "}
        {product?.brands || "Unknown"}
      </p>

      <p>
        <strong>Calories:</strong>{" "}
        {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal
      </p>

      <p>
        <strong>Fat:</strong>{" "}
        {nutriments?.fat_100g ?? "N/A"} g
      </p>

      <p>
        <strong>Sugar:</strong>{" "}
        {nutriments?.sugars_100g ?? "N/A"} g
      </p>

      {onSave && (
        <button onClick={() => onSave(product)}>
          Save Product
        </button>
      )}

      {showRemove && (
        <button onClick={() => onRemove(product.code)}>
          Remove
        </button>
      )}
    </div>
  );
}

export default FoodCard;
