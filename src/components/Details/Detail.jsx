import HomeBtn from "../HomeBtn/HomeBtn";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";

import './Details.css';

// interest way to wrtie a function in
const Details = () => {
    const dispatch = useDispatch();
    const routeParams = useParams();
    let id;

    const details = useSelector(store => store.movieDetails);
    const genres = useSelector(store => store.genres);

    const { detailId } = useParams();

    useEffect(() => {
        //dispatch({ type: 'FETCH_MOVIES' });
        id = routeParams.id;
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id})
    }, []);

    return(
        <>  
            <HomeBtn />
            {/* <p>{JSON.stringify(details)}</p> */}
            <div key={details.id} className='details'>
                <h2>{details.title}</h2>
                <a href={details.trailerURL}  target='_blank'>
                    <img src={details.poster} alt={details.title} href={details.trailerURL}/>
                </a>
                <div>
                    {details.trailerURL &&<a href={details.trailerURL} target="_blank"><button>Watch The Trailer Now!!</button></a>}
                    <h4>Details:</h4>
                    <p>{details.description}</p>
                </div>
            </div>
        </>
    )
}

export default Details;