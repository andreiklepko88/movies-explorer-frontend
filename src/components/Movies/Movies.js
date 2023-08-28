import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({
    handleCheckbox,
    isLoggedIn,
    handleMenuOpen,
    isChecked,
    isLoading,
    savedMovies,
    movies,
    query,
    setQuery,
    deleteMovie,
    saveMovie,
    queryMovies,
    setQueryMovies,
    setIsLoading,
    setMovies,
    getMovies,
    movieError,
    setMovieError
}) {

    return (
        <section>
            <Header
                isLoggedIn={isLoggedIn}
                handleMenuOpen={handleMenuOpen}
            />
            <main>
                {isLoading ?
                    <Preloader />
                    :
                    <>
                        <SearchForm
                            handleCheckbox={handleCheckbox}
                            isChecked={isChecked}
                            query={query}
                            setQuery={setQuery}
                            setQueryMovies={setQueryMovies}
                            setIsLoading={setIsLoading}
                            movies={movies}
                            savedMovies={savedMovies}
                            getMovies={getMovies}
                            setMovieError={setMovieError}
                            setMovies={setMovies}
                        />

                        <MoviesCardList
                            savedMovies={savedMovies}
                            movies={movies}
                            deleteMovie={deleteMovie}
                            query={query}
                            saveMovie={saveMovie}
                            queryMovies={queryMovies}
                            setQueryMovies={setQueryMovies}
                            isChecked={isChecked}
                            setIsLoading={setIsLoading}
                            setMovies={setMovies}
                            movieError={movieError}
                        />
                    </>
                }
            </main>
            <Footer />
        </section>
    )
}

export default Movies;