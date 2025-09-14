// src/components/moviecard.jsx

import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/moviecard.css";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const fallbackImg = "https://via.placeholder.com/300x450?text=No+Image";
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : fallbackImg;
  


  const handleFavClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={imageUrl} 
          alt={movie.title || "No Title"} 
          onError={(e) => {
            console.error("Image failed to load:", imageUrl);
            e.target.src = fallbackImg;
          }}
        />

        <div className="movie-overlay">
          <button className="favorite-btn" onClick={handleFavClick}>
            {isFavorite(movie.id) ? "❤️" : "♡"}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title || "Untitled Movie"}</h3>
        <p>{movie.release_date || "Unknown Release"}</p>
      </div>
    </div>
  );
}

export default MovieCard;