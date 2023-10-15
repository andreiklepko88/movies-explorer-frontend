import "./SavedMoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";



function SavedMoviesCardList({ savedMovies, deleteMovie, queryMovies, query, isLoading }) {
    const savedFilms = query ? queryMovies : savedMovies
    return (
        <section className="saved-movies">
            <ul className="saved-movies__list">
                {savedFilms.map((movie) =>
                    <MoviesCard
                    key={movie._id}
                    movie={movie}
                    savedMovies={savedMovies}
                    deleteMovie={deleteMovie}
                    />
                )}
            </ul>
            {query && !isLoading && !queryMovies.length && <span>Ничего не найдено</span>}
        </section>
    )
}

export default SavedMoviesCardList;
