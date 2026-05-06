import { NavLink } from "react-router-dom";

function NavBar({ savedCount }) {
  return (
    <nav className="navbar">
      <h2>Nutrition App</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/saved">
          Saved <span className="badge">{savedCount}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
