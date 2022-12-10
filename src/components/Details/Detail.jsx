import HomeBtn from "../HomeBtn/HomeBtn";

import { useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    const history = useHistory();

    const movieDetails = useSelector(store => store.MovieDetails);

    return(
        <>
            <HomeBtn/>
            <h1>Are we in datails?</h1>
            <p>{JSON.stringify(movieDetails)}</p>
        </>
    )
}

export default Details;