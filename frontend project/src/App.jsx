// import "./css/App.css";
import Favorites from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/pages/Favourites.jsx";
import Home from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/pages/home.jsx";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Contact from "./pages/contact";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;