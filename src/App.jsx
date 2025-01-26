import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')

  return (
   <main>
    <div className='pattern'/>

    <div className='wrapper'>

      <header>

        <img src='./hero.png' alt='Hero Banner'></img>
        <h1>Find <span className='text-gradient'>Movies</span> You'lle Love
         Without the hassle</h1>

      </header>

    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

    </div>
   </main>
  )
}

export default App