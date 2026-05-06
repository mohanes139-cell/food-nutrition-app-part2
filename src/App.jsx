import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";
import "./App.css";

function savedReducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (state.some((item) => item.code === action.payload.code)) {
        return state;
      }
      return [...state, action.payload];

    case "REMOVE":
      return state.filter((item) => item.code !== action.payload);

    default:
      return state;
  }
}

function App() {
  const [savedItems, dispatch] = useReducer(savedReducer, []);

  function addSaved(product) {
    dispatch({ type: "ADD", payload: product });
  }

  function removeSaved(code) {
    dispatch({ type: "REMOVE", payload: code });
  }

  return (
    <>
      <NavBar savedCount={savedItems.length} />

      <Routes>
        <Route path="/" element={<HomePage onSave={addSaved} />} />
        <Route path="/product/:barcode" element={<DetailPage onSave={addSaved} />} />
        <Route
          path="/saved"
          element={<SavedPage savedItems={savedItems} onRemove={removeSaved} />}
        />
      </Routes>
    </>
  );
}

export default App;
