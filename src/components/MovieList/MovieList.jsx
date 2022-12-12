import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './MovieList.css'
import SearchByTitle from '../SearchByTitle/SearchByTitle.jsx';
import GenreSelector from '../GenreSelector/GenreSelector';

function MovieList(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'})
    }, []);

    const handleMovieClick = (id) => {
        // dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id})
        history.push({
            pathname: '/details/'+id,
        });
    }

    return (
        <main>
            <SearchByTitle/>
            <h1 id='titleHeader'>The Collection</h1>
            <GenreSelector/>
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