import { useHistory } from 'react-router-dom';
import './HomeBtn.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function HomeBtn(){
    const history = useHistory();
    return(
        <>
            <button id='home-btn' onClick={() => history.push('/')}>
                ↩
            </button>
        </>
    )
}

export default HomeBtn;