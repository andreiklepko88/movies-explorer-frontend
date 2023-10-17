import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import savedButtonLogo from "../../images/saved-movie-logo.svg";
import unSavedButtonLogo from "../../images/unsaved-movie-logo.svg";
import deleteMovieLogo from "../../images/icon-delete-card.svg";
import { minsInHour } from "../../constants/constants";


function MoviesCard({ movie, saveMovie, deleteMovie, savedMovies }) {
    const location = useLocation();

    const imgLink = location.pathname === '/movies' ?
        `https://api.nomoreparties.co/${movie.image.url}`
        :
        movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image

    const isMovieSaved = location.pathname === '/movies' ?
        savedMovies.some((i) => i.movieId === movie.id)
        :
        true;

    const movieId = savedMovies.find((i) => i.nameRU === movie.nameRU) || movie._id;
    const buttonLogo = location.pathname === '/movies' ?
        (isMovieSaved ? savedButtonLogo : unSavedButtonLogo)
        :
        deleteMovieLogo;

    const onButton = () => {
        if (location.pathname === '/movies') {
            return (isMovieSaved ? deleteMovie(movieId._id) : saveMovie(movie))
        } else {
            return deleteMovie(movieId._id);
        }
    };

    function getTimeFromMins(movieDuration) {
        let hours = Math.trunc(movieDuration / minsInHour);
        let minutes = movieDuration % minsInHour;
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
            <a href={movie.trailerLink}><img className="movies-card__movie-picture" alt={`Фильм: ${movie.nameRU}`} src={imgLink} /></a>
        </li>
    )
}

export default MoviesCard;
