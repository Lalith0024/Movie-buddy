// import "../css/app.css";
import { useMovieContext } from "../contexts/MovieContext";
import React from "react";
import "../css/favourite.css"; // or './App.css' if not in subfolder
import Navbar from "../components/NavBar";

import MovieCard from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/components/moviecard.jsx";
// import Navbar from "../components/NavBar";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      
      
    
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
    </>
  );
}

export default Favorites;