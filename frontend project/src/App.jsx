// App.jsx

import Favorites from "./pages/Favourites.jsx";
import Home from "./pages/home.jsx";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import Contact from "./pages/contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
// import Navbar from "./components/navbar.jsx";

function App() {
  return (
    <MovieProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/Favorites"
            element={<Favorites />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
