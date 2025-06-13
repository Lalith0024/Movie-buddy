import MovieCard from "../components/moviecard";
import { useState } from 'react';
import '../css/homepage.css'; // or './App.css' if not in subfolder

function Home() {
    const [search, setSearch] = useState("");

    const handlesearch = (e) => {
        e.preventDefault();
        
    };

    const changestate = (e) => {
        setSearch(e.target.value);
    };

    const movies = [
        { title: "Movie 1", release_date: "2023-01-01", url: "https://example.com/movie1.jpg" },
        { title: "Movie 2", release_date: "2023-02-01", url: "https://example.com/movie2.jpg" },
        { title: "Movie 3", release_date: "2023-03-01", url: "https://example.com/movie3.jpg" },
        { title: "Movie 1", release_date: "2023-01-01", url: "https://example.com/movie1.jpg" },
        { title: "Movie 2", release_date: "2023-02-01", url: "https://example.com/movie2.jpg" },
        { title: "Movie 3", release_date: "2023-03-01", url: "https://example.com/movie3.jpg" },
        { title: "Movie 1", release_date: "2023-01-01", url: "https://example.com/movie1.jpg" },
        { title: "Movie 2", release_date: "2023-02-01", url: "https://example.com/movie2.jpg" },
        { title: "Movie 3", release_date: "2023-03-01", url: "https://example.com/movie3.jpg" },
    ];

    return (
        <>
            <div className="home">
                <form onSubmit={handlesearch} className="search-form">
                    <input type="text" placeholder="Search for movies..." value={search} onChange={changestate} />
                    <button className="search-button">Search</button>
                </form>
                <div className="movies-grid">
                    {movies.map((movie, index) => (
                       (movie.title.toLowerCase().startsWith(search) && <MovieCard movie={movie} key={index} />)
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
