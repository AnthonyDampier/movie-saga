import { useHistory } from 'react-router-dom';

function HomeBtn(){
    const history = useHistory();
    return(
        <>
            <button onClick={() => history.push('/')}>BACK</button>
        </>
    )
}

export default HomeBtn;