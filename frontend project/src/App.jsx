import React from 'react'
import Navbar from './components/navbar'
// import moviecard from './components/moviecard'
// import './App.css'
import Home from './pages/home'
import Favourite from './pages/Favourites'
// import {browserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
// import './css/App.css'; // or './App.css' if not in subfolder

import './css/App.css'; // or './App.css' if not in subfolder

function App() {

  

  return (
    <>
    <Navbar/>
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favourites' element={<Favourite />} />
        <Route path='/contact' element={<contact />} />
      </Routes>

    
    </main>
      
        
    </>
  )
    
}

export default App
