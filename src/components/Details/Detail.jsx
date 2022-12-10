import { useSelector, useStore } from "react-redux";


function Details(){
    const movieDetails = useSelector(store => store.MovieDetails);

    return(
        <>
            <h1>Are we in datails?</h1>
            <p>{JSON.stringify(movieDetails)}</p>
        </>
    )
}

export default Details;