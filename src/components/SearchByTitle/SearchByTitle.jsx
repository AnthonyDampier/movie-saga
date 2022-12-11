import { useDispatch } from 'react-redux';

import '../SearchByTitle/SearchByTitle.css'

function SearchByTitle(){
    const dispatch = useDispatch();
    
    const searchTitle = (event) => {
        dispatch({type: 'SEARCH_TITLE', payload: event.target.value})
    }

    return(
        <>  
        <div className='search-form'>
            <input type='text' placeholder='Search For Title' onChange={(event) => searchTitle(event)}/>
        </div>
        </>
    )
}

export default SearchByTitle;