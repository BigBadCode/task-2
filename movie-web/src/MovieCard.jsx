import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function MovieCard({ movie }) {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
            />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>

            {/* Like Button */}
            <button onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} />
            </button>
        </div>
    );
}

export default MovieCard;