import React from "react"
import '../css/favourite.css'; // or './App.css' if not in subfolder

function Favourite(){
    return (
        <>
        <div className="favourites-empty">
            <h2>oops..! no favourites added yet</h2>
            <p>Click on the heart icon to add a movie to your favourites</p>
        </div>

        
        </>
    )
}
export default Favourite;