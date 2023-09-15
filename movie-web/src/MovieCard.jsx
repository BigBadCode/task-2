// MovieCard.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_KEY = '45d4fa855d053dfccfece8b42341ce93';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

function MovieCard({ movie }) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    const [movieRating, setMovieRating] = useState(null);

    const releaseDateUTC = new Date(movie.release_date).toUTCString();

    useEffect(() => {
        // Fetch movie details based on the movie ID
        fetch(`${TMDB_BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieRating(Math.ceil(data.vote_average * 10).toFixed(1));
                data.release_date_utc = new Date(data.release_date).toUTCString();
            })
            .catch((error) => console.error('Error fetching movie details:', error));
    }, [movie.id]);

    
    const handleLikeClick = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleMovieClick = () => {
        // Use the navigate function to navigate to the movie details page
        navigate(`/movies/${movie.id}`);
    };


    return (
        <div className="movie-card" onClick={handleMovieClick} data-testid='movie-card'>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                data-testid='movie-poster'
            />
            <h2 data-testid='movie-title' >{movie.title}</h2>
            <p data-testid='movie-release-date' >{releaseDateUTC}</p>
            <div className="imdb-rating">
                {movieRating && (
                    <>
                        <p>Rating: {movieRating}/100</p>
                    </>
                )}
            </div>
            <button onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} />
            </button>
        </div>
    );
}

export default MovieCard;
