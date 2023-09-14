import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '45d4fa855d053dfccfece8b42341ce93';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        // Fetch movie details based on the movie ID
        fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => setMovieDetails(data))
            .catch((error) => console.error('Error fetching movie details:', error));
    }, [id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movieDetails.title}</h1>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Runtime: {movieDetails.runtime} minutes</p>
            <p>Overview: {movieDetails.overview}</p>
        </div>
    );
}

export default MovieDetails;
