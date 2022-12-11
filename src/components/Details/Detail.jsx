import HomeBtn from "../HomeBtn/HomeBtn";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";

// interest way to wrtie a function in
const Details = () => {
    const dispatch = useDispatch();
    const routeParams = useParams();

    const details = useSelector(store => store.movieDetails)

    const { detailId } = useParams();

    useEffect(() => {
        //dispatch({ type: 'FETCH_MOVIES' });
        console.log(routeParams);
        const id = routeParams.id;
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id})
    }, []);

    return(
        <>
            <HomeBtn/>
            <h1>Are we in details?</h1>
            <p>{JSON.stringify(details)}</p>
        </>
    )
}

export default Details;