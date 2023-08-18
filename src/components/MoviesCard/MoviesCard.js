import "./MoviesCard.css";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function MoviesCard({ movieName, movieDuration, buttonLogo, moviePicture }) {
    return (
        <li className="movies-card">
            <div className="movies-card__header-wrapper">
                <div className="movies-card__text-container">
                    <h3 className="movies-card__title">{movieName}</h3>
                    <span className="movies-card__duration">{movieDuration}</span>
                </div>
                <button className="movies-card__button" aria-label="кнопка сохранения фильма" type="button">
                    <img className="movies-card__button-logo" alt="сохранить фильм" src={buttonLogo}/>
                </button>
            </div> 
            <img className="movies-card__movie-picture" alt={movieName} src={moviePicture}/>
        </li>
    )
}

export default MoviesCard;