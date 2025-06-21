import React from "react";
import "../css/moviecard.css";

function MovieCard({ movie }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImg = "https://via.placeholder.com/300x450?text=No+Image";

  const imageUrl = movie.poster_path
    ? `${baseImgUrl}${movie.poster_path}`
    : fallbackImg;

  function onfav() {
    alert("Added to favourites");
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.title || "No Title"} />

        <div className="movie-overlay">
          <button className="favourite-btn" onClick={onfav}>
            ♡
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
