import React, { Suspense } from 'react'
import Nav from './components/Nav'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import { Loader } from '@react-three/drei'

function App() {
  return (
    <main className='w-full h-screen relative bg-[#1a0533]'>
       <Nav />
        <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path='/menu' element={<Menu/>} />
      </Routes>
    </main>
  )
}

export default App
