import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип страницы" className="header__logo" />
      {props.loggedIn ?
        <>
          <p className="header__user-email" >{localStorage.getItem('curentEmail')}</p>
          <button className="header__link header__link_login" onClick={props.onLogOut}>{props.text}</button>
        </>
        :
        <Link to={props.link} className="header__link" >{props.text}</Link>
      }


    </header>
  )
}
export default Header;