import {useDispatch} from 'react-redux';
import './GenreSelector.css'

function GenreSelector(){
    const dispatch = useDispatch();

    const genreInput = (event) => {
        console.log(event.target.value)
        if (event.target.value === '*'){
            dispatch({ type: 'FETCH_MOVIES' });
        } else {
            dispatch({type: 'FETCH_BY_GENRE', payload: event.target.value});
        }
    }

    return(

        <select className='select-dropdown' name="genre" id="genre" placeholder="genre selector" onChange={(event) => genreInput(event)}>
            <option value="*">Genre Selector</option>
            <option value="1">Adventure</option>
            <option value="2">Animated</option>
            <option value="3">Biographical</option>
            <option value="4">Comedy</option>
            <option value="5">Disaster</option>
            <option value="6">Drama</option>
            <option value="7">Epic</option>
            <option value="8">Fantasy</option>
            <option value="9">Musical</option>
            <option value="10">Romantic</option>
            <option value="11">Science Fiction</option>
            <option value="12">Space-Opera</option>
            <option value="13">Super Hero</option>
        </select>
    )
}

export default GenreSelector;