import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";

function DetailPage({ onSave }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );

        if (isMounted) {
          if (response.data.status === 1) {
            setProduct(response.data.product);
          } else {
            setError("Product not found.");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load product details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [barcode]);

  if (loading) {
    return <p className="message">Loading product details...</p>;
  }

  if (error) {
    return (
      <main className="app">
        <ErrorMessage message={error} />
        <button onClick={() => navigate("/")}>Back</button>
      </main>
    );
  }

  const nutriments = product?.nutriments;

  return (
    <main className="app">
      <button onClick={() => navigate(-1)}>Back</button>

      <div className="detail-card">
        <img
          src={
            product?.image_front_url ||
            product?.image_url ||
            "https://placehold.co/150x150?text=No+Image"
          }
          alt={product?.product_name || "Food product"}
        />

        <h1>{product?.product_name}</h1>

        <p><strong>Brand:</strong> {product?.brands || "Unknown"}</p>
        <p><strong>Barcode:</strong> {barcode}</p>
        <p><strong>Calories:</strong> {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal</p>
        <p><strong>Fat:</strong> {nutriments?.fat_100g ?? "N/A"} g</p>
        <p><strong>Sugar:</strong> {nutriments?.sugars_100g ?? "N/A"} g</p>
        <p><strong>Protein:</strong> {nutriments?.proteins_100g ?? "N/A"} g</p>

        <button onClick={() => onSave(product)}>Save Product</button>
      </div>
    </main>
  );
}

export default DetailPage;
