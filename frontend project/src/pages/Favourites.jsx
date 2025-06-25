// Favourites.jsx

import React, { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import Navbar from "../components/navbar";
import MovieCard from "../components/moviecard";
import "../css/favourite.css";

function Favorites() {
  const { favorites, removeFromFavorites } = useMovieContext();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title-asc");

  const allGenres = [
    "All",
    ...new Set(favorites.flatMap((m) => m.genre_ids || [])),
  ];

  const filtered = favorites
    .filter((m) =>
      filter === "All" ? true : m.genre_ids?.includes(filter)
    )
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      if (sort === "rating-asc") return a.vote_average - b.vote_average;
      if (sort === "rating-desc") return b.vote_average - a.vote_average;
      return 0;
    });

  const exportFavorites = () => {
    const blob = new Blob([JSON.stringify(favorites, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favorites.json";
    a.click();
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="favorites">
        <h2>Your Favorites</h2>

        {favorites.length > 0 && (
          <div className="toolbar">
            <input
              type="text"
              className="search-box"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {allGenres.map((g, i) => (
                <option value={g} key={i}>
                  {typeof g === "number" ? `Genre ${g}` : g}
                </option>
              ))}
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="title-asc">Title ↑</option>
              <option value="title-desc">Title ↓</option>
              <option value="rating-asc">Rating ↑</option>
              <option value="rating-desc">Rating ↓</option>
            </select>

            <button className="export-btn" onClick={exportFavorites}>
              Export JSON
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="movies-grid">
            {filtered.map((movie) => (
              <div className="favorite-card" key={movie.id}>
                <MovieCard movie={movie} />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <h2>No Favorite Movies Found</h2>
            <p>Try adding some movies or adjust filters.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;