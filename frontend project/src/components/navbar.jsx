import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;