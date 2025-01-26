import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search' >
        <div>
            <img src='./search.svg' alt='Search Icon'></img>
            <input 
             type='text'
             placeholder='Search through thousands of movies'
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}>
            </input>
        </div>
    </div>
  )
}

export default Search