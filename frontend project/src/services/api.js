// api.js

const API_KEY = "6ab54fceee442e14740863a7584572ac"; // Your API key
const BASE_URL = "https://api.themoviedb.org/3"; 

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!response.ok) throw new Error("Failed to fetch popular movies");
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`);
  if (!response.ok) throw new Error("Failed to search movies");
  const data = await response.json();
  return data.results;
};