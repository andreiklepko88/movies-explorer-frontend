import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
        <section className="movies">
            <ul className="movies__list">
                
            </ul>
            <button className="movies__loader-button" type="button" aria-label="загрузить больше фильмов">Ещё</button>
        </section>
    )
}

export default MoviesCardList;