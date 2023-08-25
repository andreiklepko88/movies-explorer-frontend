import "./MoviesCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import savedButtonLogo from "../../images/saved-movie-logo.svg";
import unSavedButtonLogo from "../../images/unsaved-movie-logo.svg";
import deleteMovieLogo from "../../images/icon-delete-card.svg";


function MoviesCard({ movie, saveMovie, deleteMovie, savedMovies }) {
    const location = useLocation();
    
    const isMovieSaved = savedMovies.some((i) => i.movieId === movie.id);

    const buttonLogo = () => {
         if (location.pathname === '/movies') {
            return isMovieSaved ? savedButtonLogo : unSavedButtonLogo;
        } else {
            return deleteMovieLogo;
        } 
    };

const currentUser = useContext(CurrentUserContext);

const onButton = () => {
    if (location.pathname === '/movies') {
        return isMovieSaved ? deleteMovie(movie._id) : saveMovie(movie);
    } else {
        return deleteMovie(movie._id);
    } 
};

function getTimeFromMins(movieDuration) {
    let hours = Math.trunc(movieDuration / 60);
    let minutes = movieDuration % 60;
    if (hours === 0) {
        return minutes + 'м'
    } else if (minutes === 0) {
        return hours + 'ч'
    } else {
        return hours + 'ч ' + minutes + 'м';
    }
};

return (
    <li className="movies-card">
        <div className="movies-card__header-wrapper">
            <div className="movies-card__text-container">
                <h3 className="movies-card__title">{movie.nameRU}</h3>
                <span className="movies-card__duration">{getTimeFromMins(movie.duration)}</span>
            </div>
            <button className="movies-card__button" onClick={onButton} aria-label="кнопка сохранения и удаления фильма" type="button">
                <img className="movies-card__button-logo" alt="сохранить или удалить фильм" src={buttonLogo} />
            </button>
        </div>
        <img className="movies-card__movie-picture" onClick={movie.trailerLink} alt={`Фильм: ${movie.nameRU}`} src={`https://api.nomoreparties.co${movie.image.url}`} />
    </li>
)
}

export default MoviesCard;