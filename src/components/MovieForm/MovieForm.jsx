import HomeBtn from "../HomeBtn/HomeBtn";

import React from "react";
import {useState} from "react";
import {useDispatch} from 'react-redux';

function MoviehtmlForm(){
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [fullInput, setFullInput] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();
        console.log('sumited for');
        if (fullInput === true && genre !== ''){
            dispatch({type: 'SUBMIT_MOVIE', payload: {title: title, poster: imageUrl, description: description, genre_id: genre}})
        }
    }

    const titleInput = (event) => {
        console.log(event.target.value);
        setTitle(event.target.value);
    }

    const urlInput = (event) => {
        console.log(event.target.value);
        setImageURL(event.target.value);
    }

    const descriptionInput = (event) => {
        console.log(event.target.value);
        setDescription(event.target.value);
    }

    const genreInput = (event) => {
        console.log(event.target.value);
        setGenre(event.target.value);
    }

    const checkInputs = () => {
        if (title !== '' && description !== '' && imageUrl !== ''){
            // TODO: would like htmlFor onChange to recognize selector genre input; would fix with more time.
            setFullInput(true);
        } else {
            setFullInput(false)
        }
    }



    return(
        <>
            <h1>Movie htmlForm Page</h1>
            <HomeBtn/>
            <form onChange={() => checkInputs()} onSubmit={(event) => submitForm(event)}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(event) => titleInput(event)}/>
                <label>Poster Image URL <i>less than 120 character</i>:</label>
                <input type="text" value={imageUrl} onChange={(event) => urlInput(event)}/>
                <label>Movie Description:</label>
                <textarea type="text" value={description} onChange={(event) => descriptionInput(event)}/>
                <div>
                <label htmlFor="genres" >Choose a movie genre:</label>
                    <select name="genres" id="genres" value={genre} onChange={(event) => genreInput(event)}>
                        <option value=""></option>
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
                        <option value="13">Superhero</option>
                    </select>
                    {fullInput == true && <input type='submit' value='submit'/>}
                </div>
            </form>
        </>
    )
}

export default MoviehtmlForm;