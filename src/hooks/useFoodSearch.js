import { useState } from "react";
import axios from "axios";

function useFoodSearch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchFood(query) {
    setLoading(true);
    setError("");
    setProducts([]);

    try {
      const response = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl",
        {
          params: {
            search_terms: query,
            search_simple: 1,
            action: "process",
            json: 1,
            page_size: 20,
          },
        }
      );

      const validProducts = response.data.products.filter(
        (product) =>
          product?.product_name?.trim() &&
          product?.brands?.trim() &&
          product?.code
      );

      setProducts(validProducts);
    } catch (err) {
      setError(
        "Something went wrong while searching products."
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
    error,
    searchFood,
  };
}

export default useFoodSearch;
