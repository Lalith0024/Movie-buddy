const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5000;

const API_KEY = "6ab54fceee442e14740863a7584572ac";
const BASE_URL = "https://api.themoviedb.org/3";

app.use(cors());

app.get("/api/popular", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.error("Error searching movies:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
