import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard';
import TopMovies from './TopMovies';
import MovieDetails from './MovieDetails';

const API_KEY = '45d4fa855d053dfccfece8b42341ce93';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [topMovies, setTopMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch top 10 movies
    fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=1`)
      .then((response) => response.json())
      .then((data) => setTopMovies(data.results))
      .catch((error) => console.error('Error fetching top movies:', error));
  }, []);

  const handleSearch = () => {
    // Fetch movies based on the search query
    fetch(`${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.error('Error fetching search results:', error));
  };

  return (
    <Router>
      <div>
        <header>
          <Link to="/" className='movie-box'>MovieBox</Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} className='icon' />
            </button>
          </div>
          <p className='sign-in'>Sign In</p>
        </header>

        <Routes>
          <Route path="/" element={<TopMovies topMovies={topMovies} searchResults={searchResults} />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
