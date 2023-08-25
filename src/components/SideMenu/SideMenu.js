import "./SideMenu.css";
import { Link, NavLink } from "react-router-dom";
import menuProfileLogo from "../../images/icon__COLOR_icon-main-resized.svg";

function SideMenu({ isSideMenuOpen, onCloseMenu }) {
    const overlayClassName = `side-menu ${ isSideMenuOpen && 'side-menu_overlay-visible'}`;
    const sideMenuMove = `side-menu__wrapper ${ !isSideMenuOpen && 'side-menu__wrapper_opened'}`; 

    return (
        <section className={ overlayClassName }>
            <div className={sideMenuMove}>
                <button className="side-menu__close-button" type="button" aria-label="закрыть" onClick={onCloseMenu}/>
                <nav className="side-menu__navigation">
                    <ul className="side-menu__nav-list">
                        <li className="side-menu__nav-link"><NavLink className={"side-menu__nav-link-item"} onClick={onCloseMenu} to="/">Главная</NavLink></li>
                        <li className="side-menu__nav-link"><NavLink className={"side-menu__nav-link-item"} onClick={onCloseMenu} to="/movies">Фильмы</NavLink></li>
                        <li className="side-menu__nav-link"><NavLink className={"side-menu__nav-link-item"} onClick={onCloseMenu} to="/saved-movies">Сохранённые фильмы</NavLink></li>
                    </ul>
                    <ul className="side-menu__nav-profile">
                        <li className="side-menu__profile-link"><NavLink className="side-menu__profile-link-item" onClick={onCloseMenu} to="/profile">Аккаунт</NavLink></li>
                        <li className="side-menu__profile-link-logo">
                            <Link className="side-menu__profile-logo-item" onClick={onCloseMenu} to='/profile'>
                                <img className="side-menu__profile-logo" alt="логотип профиля" src={ menuProfileLogo }/>
                            </Link>
                        </li>
                    </ul>
                </nav>


            </div>
        </section>
    )
}

export default SideMenu;