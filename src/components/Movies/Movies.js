import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({ handleCheckbox, isLoggedIn, handleMenuOpen, isChecked, isLoading, savedMovies, movies, query, setQuery, deleteMovie, saveMovie }) {
    return (
        <section>
            {isLoading ?
                <Preloader />
                :
                <>
                    <Header
                        isLoggedIn={!isLoggedIn}
                        handleMenuOpen={handleMenuOpen}
                    />
                    <main>
                        <SearchForm handleCheckbox={handleCheckbox} isChecked={isChecked} query={query} setQuery={setQuery}/>
                        <MoviesCardList savedMovies={savedMovies} movies={movies} deleteMovie={deleteMovie} saveMovie={saveMovie} />
                        <Footer />
                    </main>
                </>
            }
        </section>
    )
}

export default Movies;