import "./Header.css";
import { useState } from "react";
import { Link, useLocation, Routes, Route, NavLink } from 'react-router-dom';
import headerLogo from "../../images/logo-header-resized.svg"
import headerProfilelogo from "../../images/icon__COLOR_icon-main-resized.svg";

function Header({isLoggedIn, handleMenuOpen}) {
    const location = useLocation();
    const headerClassName = `header ${location.pathname === '/' && 'header_main'}`;

    return (
        <header className={headerClassName}>
            <div className="header-wrapper">
                <Link to="/">
                    <img className="header__logo" src={headerLogo} alt="логотип" />
                </Link>
                {!isLoggedIn ? (
                <div className="header__container">
                    <nav className="header__unauthorized">
                        <ul className="header__unauthorized-landing">
                            <li className="header__unauthorized-signup"><Link className="header__unauthorized-signup-item" to='/signup'>Регистрация</Link></li>
                            <li className="header__unauthorized-signin"><Link className="header__unauthorized-signin-item" to='/signin'>Войти</Link></li>
                        </ul>
                    </nav>
                </div>
                ):(
                <div className="header__container">
                    <nav className="header__authorized">
                        <ul className="header__authorized-movies">
                            <li className="header__authorized-link"><NavLink className={'header__authorized-link-item'} to='/movies'>Фильмы</NavLink></li>
                            <li className="header__authorized-link"><NavLink className={'header__authorized-link-item'} to='/saved-movies'>Сохранённые фильмы</NavLink></li>
                        </ul>
                        <ul className="header__authorized-profile">
                            <li className="header__profile-link"><NavLink className={"header__profile-link-item"} to='/profile'>Аккаунт</NavLink></li>
                            <li className="header__profile-link-logo">
                                <Link className="header__profile-logo-item" to='/profile'>
                                    <img className="header__profile-logo" alt="логотип профиля" src={ headerProfilelogo }/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <button className="header__burger-open" type="button" aria-label="открыть меню" onClick={ handleMenuOpen }/>
                </div>
                )}
            </div>
        </header>
    )
};

export default Header;