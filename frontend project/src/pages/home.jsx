// src/pages/home.jsx
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/services/api.js";
import "../css/homepage.css";
import Navbar from "../components/navbar";  // ✅ lowercase file name
import MovieCard from "../components/moviecard";  // ✅ relative path, lowercase

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Failed to load popular movies:", err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    console.log("Using API:", getPopularMovies.toString());

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {Array.isArray(movies) && movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id || movie.title || Math.random()} />
              ))
            ) : (
              <div className="no-results">No movies found.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
