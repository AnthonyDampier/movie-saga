import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleMovieClick = (id) => {
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id})
        history.push('/details')
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <img src={movie.poster} alt={movie.title} onClick={() => handleMovieClick(movie.id)}/>
                            <h3>{movie.title}</h3>
                        </div>
                    );
                })}
            </section>
            <button id="addBTN"onClick={() => history.push('/addAMovie')}>Add A Movie</button>
        </main>

    );
}

export default MovieList;