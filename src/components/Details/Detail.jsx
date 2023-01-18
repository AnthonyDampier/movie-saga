import HomeBtn from "../HomeBtn/HomeBtn";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import './Details.css';

// interest way to wrtie a function in
const Details = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [id, setId] = useState(-1);

    const movies = useSelector(store => store.movies);

    const  details =  useSelector(store => store.movieDetails);

    const handleMovieClick = (newId) => {
        // dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id})
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: newId})
    }

    useEffect(() => {
        //dispatch({ type: 'FETCH_MOVIES' });
        setId(routeParams.id);
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id})
    }, [id]);

    return(
        <>  
            <HomeBtn />
            {/* <p>{JSON.stringify(details)}</p> */}
            {details.id && 
            <div key={details.id} className='details'>
            <center>
                <h2 id="title" >{details.title}</h2>
                <a href={details.trailerURL}  target='_blank'>
                    <img src={details.poster} alt={details.title} href={details.trailerURL}/>
                </a>
                <div>
                    {details.trailerURL &&<a href={details.trailerURL} target="_blank"><button>Watch The Trailer Now!!</button></a>}
                    <h4>Details:</h4>
                    <p>{details.description}</p>
                </div>
                {details.genre_array ? 
                    <ul>
                        {details.genre_array.map(
                            (genre, index) =>{
                                return(
                                    <li key={index}>{genre}</li>
                                )
                            }
                        )}
                    </ul>
                    :
                    <ul>
                        <li>No Genre</li>
                    </ul>
                }
                </center>
                <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <img 
                                id="movie-list"
                                src={movie.poster} 
                                alt={movie.title} 
                                onClick={() => handleMovieClick(movie.id)}
                                />
                            <h3>{movie.title}</h3>
                        </div>
                    );
                })}
                </section>
            </div>
            }
        </>
    )
}



export default Details;