// Favourites.jsx

import React, { useState, useMemo } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import Navbar from "../components/navbar";
import MovieCard from "../components/moviecard";
import "../css/favourite.css";

// Genre mapping for better display
const genreMap = {
  28: "Action",
  12: "Adventure", 
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

function Favorites() {
  const { favorites, removeFromFavorites } = useMovieContext();
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Get unique genres from favorites
  const availableGenres = useMemo(() => {
    const genres = new Set();
    favorites.forEach(movie => {
      if (movie.genre_ids) {
        movie.genre_ids.forEach(id => genres.add(id));
      }
    });
    return ["All", ...Array.from(genres).sort()];
  }, [favorites]);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let filtered = favorites.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genreFilter === "All" || 
        (movie.genre_ids && movie.genre_ids.includes(parseInt(genreFilter)));
      return matchesSearch && matchesGenre;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "rating-asc":
          return (a.vote_average || 0) - (b.vote_average || 0);
        case "rating-desc":
          return (b.vote_average || 0) - (a.vote_average || 0);
        case "date-asc":
          return new Date(a.release_date || 0) - new Date(b.release_date || 0);
        case "date-desc":
          return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [favorites, search, genreFilter, sortBy]);

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

  const clearAllFavorites = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      favorites.forEach(movie => removeFromFavorites(movie.id));
    }
  };

    return (
    <>
      <Navbar />
      <div className="favorites-page">
        <div className="favorites-header">
          <div className="header-content">
            <h1>My Favorites</h1>
            <p>Your personal collection of amazing movies</p>
            <div className="stats">
              <span className="stat-item">
                <strong>{favorites.length}</strong> movies
              </span>
              <span className="stat-item">
                <strong>{availableGenres.length - 1}</strong> genres
              </span>
            </div>
          </div>
        </div>

        {favorites.length > 0 ? (
          <>
            <div className="filters-section">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-controls">
                <div className="filter-group">
                  <label>Genre:</label>
                  <select 
                    value={genreFilter} 
                    onChange={(e) => setGenreFilter(e.target.value)}
                    className="filter-select"
                  >
                    {availableGenres.map(genreId => (
                      <option key={genreId} value={genreId}>
                        {genreId === "All" ? "All Genres" : genreMap[genreId] || `Genre ${genreId}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Sort by:</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                    <option value="rating-desc">Rating High-Low</option>
                    <option value="rating-asc">Rating Low-High</option>
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                  </select>
                </div>

                <div className="view-controls">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="export-btn" onClick={exportFavorites}>
                  Export JSON
                </button>
                <button className="clear-btn" onClick={clearAllFavorites}>
                  Clear All
                </button>
              </div>
            </div>

            {filteredMovies.length > 0 ? (
              <div className={`movies-container ${viewMode}`}>
                {filteredMovies.map((movie) => (
                  <div className="favorite-item" key={movie.id}>
                    <MovieCard movie={movie} />
                    <button
                      className="remove-btn"
                      onClick={() => removeFromFavorites(movie.id)}
                      title="Remove from favorites"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No movies found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h2>No Favorites Yet</h2>
            <p>Start building your collection by adding movies from the home page!</p>
            <button className="browse-btn" onClick={() => window.location.href = '/home'}>
              Browse Movies
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;