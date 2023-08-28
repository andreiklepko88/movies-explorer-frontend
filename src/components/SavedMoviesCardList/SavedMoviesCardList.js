import "./SavedMoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";



function SavedMoviesCardList({ savedMovies, deleteMovie, queryMovies, query }) {
    const moviesForRender = query ? queryMovies : savedMovies;
    return (
        <section className="saved-movies">
            <ul className="saved-movies__list">
                { moviesForRender.map((movie) => 
                    <MoviesCard
                    key={movie._id}
                    movie={movie}
                    savedMovies={savedMovies}
                    deleteMovie={deleteMovie}
                    />
                )}
            </ul>
        </section>
    )
}

export default SavedMoviesCardList;