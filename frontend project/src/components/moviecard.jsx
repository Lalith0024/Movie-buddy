import React from "react";

function moviecard({movie}){
    function onfav(){
        alert("Added to favourites");
    }
  return (
    <>
    <div className="movie-card">
        <div className="movie-poster">
            <img src="{movie.url}" alt="movie.title"></img>
            <div className="movie-overlay">
                <button className="favourite-btn" onClick={onfav}> ♡ </button>
            </div>

        </div>
    <div className="movie-info">
        <h3>{movie.title}</h3>
        <p></p>
    </div>

    </div>


    </>
  );
}
export default moviecard;