import React from 'react'
import Navbar from './components/navbar'
// import moviecard from './components/moviecard'
import './App.css'
import Home from './pages/home'
import Favourite from './pages/Favourites'
// import {browserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'


function App() {

  

  return (
    <>
    <Navbar></Navbar>
    <main className='main-content'>

    <Routes>
      <Route path='/' element = {<Home/>}></Route>
      <Route path='/' element = {<Favourite/>}></Route>
    </Routes>
    
    </main>
      
        
    </>
  )
    
}

export default App
