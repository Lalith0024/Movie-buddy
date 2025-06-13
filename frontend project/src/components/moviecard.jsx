import React from "react";

function moviecard(){
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

    </div>


    </>
  );
}
export default moviecard;