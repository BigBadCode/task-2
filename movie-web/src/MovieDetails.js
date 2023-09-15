import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '45d4fa855d053dfccfece8b42341ce93';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieRating, setMovieRating] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        // Fetch movie details based on the movie ID
        fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieDetails(data);
                // Set the movie rating to a state variable
                setMovieRating(data.vote_average);
                data.release_date_utc = new Date(data.release_date).toUTCString();
            })
            .catch((error) => console.error('Error fetching movie details:', error));

        // Fetch movie trailer data
        fetch(`${TMDB_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                // Assuming you want to display the first trailer in the results
                if (data.results.length > 0) {
                    setTrailerKey(data.results[0].key);
                }
            })
            .catch((error) => console.error('Error fetching trailer data:', error));
    }, [id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {trailerKey && (
                <iframe
                    title={`${movieDetails.title} Trailer`}
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    allowFullScreen
                />
            )}
            <div className='movie-details'>
                <div className='details-flex'>
                    <h1 data-testid='movie-title' className='md-h1'>{movieDetails.title}</h1>
                    <h1 data-testid='movie-release-date'>{movieDetails.release_date_utc}</h1>
                    <h1>Rating: {movieRating}</h1> {/* Display the movie rating */}
                    <h1 data-testid='movie-runtime'>{movieDetails.runtime} minutes</h1>
                </div>
                <p data-testid='movie-overview' className='overview'>{movieDetails.overview}</p>
            </div> 
        </div>
    );
}

export default MovieDetails;
