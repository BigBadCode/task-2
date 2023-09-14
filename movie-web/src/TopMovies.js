import React from 'react';
import MovieCard from './MovieCard'; // Import the MovieCard component

function TopMovies({ topMovies, searchResults }) {
    // Use searchResults if available; otherwise, use topMovies
    const moviesToDisplay = searchResults.length > 0 ? searchResults : topMovies.slice(0,10);

    return (
        <div>
            <h1>{searchResults.length > 0 ? 'Search Results' : 'Top 10 Movies'}</h1>
            <div className="movie-grid">
                {moviesToDisplay.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default TopMovies;
