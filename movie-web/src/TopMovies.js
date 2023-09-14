import React from 'react';
import MovieCard from './MovieCard';

function TopMovies({ topMovies }) {
    return (
        <div>
            <h1>Top 10 Movies</h1>
            <div className="movie-grid">
                {topMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default TopMovies;
