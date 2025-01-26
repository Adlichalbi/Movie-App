import React, { useState , useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchMovies = async(query ='') => {
    setLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query ? 
      `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&query=${searchTerm}`
      const response = await fetch(endpoint, API_OPTIONS)
      
      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Error fetching movies')
        setMovies([])
        return;
      }
      setMovies(data.results || [])


    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchMovies(searchTerm)
  },[searchTerm])


  return (
   <main>
    <div className='pattern'/>

    <div className='wrapper'>

      <header>

        <img src='./hero.png' alt='Hero Banner'></img>
        <h1>Find <span className='text-gradient'>Movies</span> You'lle Love
         Without the hassle</h1>
         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

    <section className='all-movies'>

      <h2 className='mt-[40px]'>All Movies</h2>

    {loading ? (
        <Spinner/>
      ) : errorMessage ? (
         <p className='text-red-500'>{errorMessage} </p>
         ) : (
          <ul>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
         ) }

    </section>

    </div>
   </main>
  )
}

export default App