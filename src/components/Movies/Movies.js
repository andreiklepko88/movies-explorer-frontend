import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({
    handleCheckbox,
    isLoggedIn,
    handleMenuOpen,
    isChecked,
    isLoading,
    savedMovies,
    // movies,
    query,
    setQuery,
    deleteMovie,
    saveMovie,
    queryMovies,
    setQueryMovies,
    setIsLoading,
    // setMovies,
    // getMovies,
    // movieError,
    // setMovieError
}) {
    const [movies, setMovies] = useState([]);
    const [movieError, setMovieError] = useState(null);

    useEffect(() => {
        const storageMovies = localStorage.getItem('movies')
        if (storageMovies) {
            setMovies(JSON.parse(storageMovies))
        } else {
            localStorage.setItem('movies', JSON.stringify(movies)) // '[]'
        }
        console.log('effect')
        //localStorage.setItem('movies', JSON.stringify(movies));
    }, [])

    async function getMainMovies() {
        console.log('getMainMovies')
        const moviesLocal = JSON.parse(localStorage.getItem('movies') || '[]'); // '[]'
        if (!moviesLocal.length) {
            try {
                setIsLoading(true);
                const movies = await moviesApi.getMovies();
                console.log(movies);
                setMovies(movies);
                localStorage.setItem('movies', JSON.stringify(movies));
                setMovieError(false);
            } catch (err) {
                console.log(err);
                setMovieError(true);
            }
            setIsLoading(false);
        }
    }

    function onSubmit() {
        getMainMovies();
        setMovieError(false);
    }

    console.log('movies')


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
                            getMovies={getMainMovies}
                            setMovieError={setMovieError}
                            setMovies={setMovies}
                            onSubmit={onSubmit}
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
                            isLoading={isLoading}
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