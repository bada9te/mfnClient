import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import './navigation-button.scss';

const NavigationButton = (props) => {
    const {to, text} = props;

    return (
        <div className="navigation-button">
            <NavLink to={to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <div className='nav-item d-flex align-items-center justify-content-center d-mode-text'>
                    { text === 'Home'     ? <Icon.MusicNoteList  className="icon-styled"/> : null }
                    { text === 'Battles'  ? <Icon.XDiamondFill   className="icon-styled"/> : null }
                    { text === 'Chats'    ? <Icon.ChatLeftFill   className="icon-styled"/> : null }
                    { text === 'New post' ? <Icon.PlusSquareFill className="icon-styled"/> : null }
                    
                    <span>{text}</span>
                </div>
            </NavLink>
        </div>
    );
}


export default NavigationButton;