// App.jsx

import Favorites from "./pages/Favourites.jsx";
import Home from "./pages/home.jsx";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/components/navbar.jsx";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Register from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/pages/register.jsx"; // optional
import Navbar from "./components/navbar.jsx";

function App() {
  return (
    <MovieProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                {/* <NavBar /> */}
                <Home />
              </>
            }
          />
          <Route
            path="/Favorites"
            element={
              <>
                {/* <NavBar /> */}
                <Navbar/>
                <Favorites />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                {/* <NavBar /> */}
                <Contact />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
