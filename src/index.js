import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('SUBMIT_MOVIE', submitNewMovie);
    yield takeEvery('SEARCH_TITLE', searchTitle);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('FETCH_BY_GENRE', fetchByGenre);
}

// fetch movie by their related genre
function* fetchByGenre(action){
    try{
        const moviesByGenre = yield axios.get('/api/movie/ByGenre/'+action.payload);
        yield put({type: 'SET_MOVIES', payload: moviesByGenre.data});
    } catch (error){
        console.log(error);
    }
}

// fetch relational DB from genres and movies
function* fetchGenres(action){
    // console.log('in fetch Genres: ', action.payload);
    try{
        const genres = yield axios.get('/api/genre');
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch (error){
        console.log(error);
    }
}

// search for title based on search inputs
function* searchTitle(action){
    console.log('in searchTitle', action.payload);
    try{
        const likeTitles = yield axios.get('/api/movie/search/'+ action.payload);
        yield put({type: 'SET_MOVIES', payload: likeTitles.data})
    } catch (error){
        console.log(error);
    }
}

// posts a user created movie to DB and refetch & refresh movies 
function* submitNewMovie(action){
    console.log(action.payload);
    try{
        yield axios.post('/api/movie', action.payload);
        yield put({type: 'FETCH_MOVIES'});
    } catch (err){
        console.log(err);
    }
}

function* fetchMovieDetails(action){
    //get movie detail that has $1 = id
    //console.log('fetch details by id',action.payload);
    try{
        // axios get movie by id
        const movieDetails = yield axios.get('/api/movie/details/'+action.payload);
        // console.log('Movie Details: ', movieDetails)
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails});
    }
    catch (error){
        console.log('fetchmovieDetails: ',error);
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        // console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// used to store the movie details of one movie
const movieDetails = (state = {}, action) => {
    switch (action.type){
        case 'SET_MOVIE_DETAILS':
            return action.payload.data[0];
        default:
            return {};
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);


// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
