import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-main">Movie</span>
          <span className="brand-buddy">Buddy</span>
        </div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          {/* <Link to="/Favourites" className="nav-link" onClick={() => setMenuOpen(false)}>Favorites</Link>
           */}
           {/* <Link to="/Favourites" className="nav-link">Favorites</Link>
            */}
            <Link to="/Favorites" className="nav-link" onClick={() => setMenuOpen(false)}>
  Favorites
</Link>


          {/* <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link> */}
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      </nav>

      <div className="navbar-glow-line"></div>
    </>
  );
}

export default Navbar;
