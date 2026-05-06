import FoodCard from "./FoodCard";

function FoodList({ products, onSave }) {
  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard
          key={product.code}
          product={product}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

export default FoodList;
