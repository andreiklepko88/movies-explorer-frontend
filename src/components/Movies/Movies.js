import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { shortFilm } from "../../constants/constants";

function Movies({
    handleCheckbox,
    isLoggedIn,
    handleMenuOpen,
    isChecked,
    isLoading,
    savedMovies,
    query,
    setQuery,
    deleteMovie,
    saveMovie,
    queryMovies,
    setQueryMovies,
    setIsLoading,
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
    }, [movies])

    useEffect(() => {
        setQueryMovies(isChecked ?
            movies.filter((movie) => {
                return (movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()).includes(query.toLowerCase())
                    &&
                    (movie.duration <= shortFilm);
            })
            :
            movies.filter((movie) => {
                return (movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()).includes(query.toLowerCase());
            })
        );
    },[isChecked, movies])

    async function getMainMovies() {
            try {
                const storageMovies = localStorage.getItem('movies')
                setIsLoading(true);
                if (!JSON.parse(storageMovies).length) {
                    const allMovies = await moviesApi.getMovies();
                    setMovies(allMovies);
                    localStorage.setItem('movies', JSON.stringify(allMovies));
                } else {
                    setMovies(JSON.parse(storageMovies))
                }
                setMovieError(false);
            } catch (err) {
                setMovieError(true);
            }
            setIsLoading(false);
        }

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
                            setIsLoading={setIsLoading}                                                   
                            getMovies={getMainMovies}
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
