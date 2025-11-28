import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/MyNavbar'
import HeroSection from './pages/HeroSection'


const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HeroSection/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App