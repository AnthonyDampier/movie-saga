import HomeBtn from "../HomeBtn/HomeBtn";

import React from "react";
import {useState} from "react";
import {useDispatch} from 'react-redux';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';




import './MovieForm.css';

function MovieForm(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [trailerURL, setTrailerURL] = useState('');

    const [fullInput, setFullInput] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();
        // console.log('sumited for', event.target.value);
        if (fullInput === true && genre !== '' && event.target.value == 'submit'){
            dispatch({type: 'SUBMIT_MOVIE', payload: {title: title, poster: imageUrl, description: description, genre_id: genre, trailerURL: trailerURL}})
            history.push('/');
        }
        else if(event.target.value == 'cancel'){
            history.push('/');
        }
        else{
            swal({
                title: 'Please, fill out all fields!',
                background: ''
            });
        }
    }

    // set inputs
    const titleInput = (event) => {
        // console.log(event.target.value);
        setTitle(event.target.value);
    }

    const urlInput = (event) => {
        // console.log(event.target.value);
        setImageURL(event.target.value);
    }

    const descriptionInput = (event) => {
        // console.log(event.target.value);
        setDescription(event.target.value);
    }

    const genreInput = (event) => {
        // console.log(event.target.value);
        setGenre(event.target.value);
    }

    const trailerInput = (event) => {
        setTrailerURL(event.target.value);
    }

    // checks to insure all inputs are complete
    const checkInputs = () => {
        if (title !== '' && description !== '' && imageUrl !== '' && trailerURL !== ''){
            setFullInput(true);
        } else {
            setFullInput(false)
        }
    }



    return(
        <>
            <HomeBtn/>
            <h2>Add To The Collection!</h2>
            <form onChange={() => checkInputs()}>
                <div>
                    <label>Title : </label>
                    <input type="text" value={title} onChange={(event) => titleInput(event)}/>
                </div>
                <div>
                    <label>Poster Image URL : </label>
                    <input placeholder="less than 120 character" type="text" value={imageUrl} onChange={(event) => urlInput(event)}/>
                </div>
                <div>
                    <label>Movie Description : </label>
                    <textarea type="text" value={description} onChange={(event) => descriptionInput(event)}/>
                </div>
                <div id="genres-select">
                    <label 
                        htmlFor="genres" >Choose a movie genre :
                    </label>
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
                </div>
                <div>
                    <label>Trailer URL: </label>
                    <input type="text" value={trailerURL} onChange={(event) => trailerInput(event)}/>
                </div>
                <div>
                    <button id='submit-btn' type='submit' value='submit' onClick={(event) => submitForm(event)}>submit</button>
                </div>
                <div>
                    <button id='cancel-btn' type='cancel' value='cancel' onClick={(event) => submitForm(event)}>cancel</button>
                </div>
            </form>
        </>
    )
}

export default MovieForm;