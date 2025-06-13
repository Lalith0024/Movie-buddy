import React from "react";
import MovieCard from "../components/moviecard";

function home(){

    const movies = [
        {title: "Movie 1",release_date: "2023-01-01",url: "https://example.com/movie1.jpg"},
        {title: "Movie 2",release_date: "2023-02-01",url: "https://example.com/movie2.jpg"},
        {title: "Movie 1",release_date: "2023-01-01",url: "https://example.com/movie1.jpg"},
        {title: "Movie 2",release_date: "2023-02-01",url: "https://example.com/movie2.jpg"},
        {title: "Movie 1",release_date: "2023-01-01",url: "https://example.com/movie1.jpg"},
        {title: "Movie 2",release_date: "2023-02-01",url: "https://example.com/movie2.jpg"}
    ];
    return(
        <>
        <div className="home">
            <div className="movies-grid">
                {movies.map((movie)=>(
                    <MovieCard movie={movie} key={movie.title} />
                ))}
            </div>
            
        </div>
        </>
    )
}
export default home;