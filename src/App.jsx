// import logo from './logo.svg';
import React from 'react'
import './App.css'
import ListEvents from './Components/ListEvents'
import { Header } from './Components/Headers'
import { Footer } from './Components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddEvent } from './Components/AddEvent'
// import Error from './Components/Error'
function App () {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<ListEvents/>}/>
        <Route path='/event' element={<ListEvents/>}/>
        <Route path='addEvent' element={<AddEvent/>}/>
        <Route path='/update/:id' element={<AddEvent/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App // Remove the extra semicolon here
