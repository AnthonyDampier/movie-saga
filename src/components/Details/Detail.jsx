import { useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    const history = useHistory();

    const movieDetails = useSelector(store => store.MovieDetails);

    const handleBackBtn = () => {
        console.log('in handleBackBtn');
        history.push('/');
    }

    return(
        <>
            <button onClick={() => handleBackBtn()}>BACK</button>
            <h1>Are we in datails?</h1>
            <p>{JSON.stringify(movieDetails)}</p>
        </>
    )
}

export default Details;