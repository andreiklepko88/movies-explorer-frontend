import "./SavedMovies.css";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { mainApi } from '../../utils/MainApi';
import { shortFilm } from "../../constants/constants";

function SavedMovies({
    isLoggedIn,
    handleMenuOpen,
    isLoading,
    savedMovies,
    deleteMovie,
    setIsLoading,
    savedQueryMovies,
    setSavedQueryMovies,
    setMovieError,
    setSavedMovies,
}) {
    const [savedMoviesQuery, setSavedMoviesQuery] = useState("");
    const [isSavedMoviesChecked, setSavedMoviesChecked] = useState(false);


    function handleSavedMoviesCheckbox() {
        setSavedMoviesChecked(!isSavedMoviesChecked);
    };


    useEffect(() => {
        setSavedQueryMovies(isSavedMoviesChecked ?
            savedMovies.filter((movie) => {
                return (movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()).includes(savedMoviesQuery.toLowerCase())
                    &&
                    (movie.duration <= shortFilm);
            })
            :
            savedMovies.filter((movie) => {
                return (movie.nameRU.toLowerCase() || movie.nameEN.toLowerCase()).includes(savedMoviesQuery.toLowerCase());
            })
        );
    }, [isSavedMoviesChecked, savedMoviesQuery])

    async function getMainSavedMovies() {
        try {
            const storageSavedMovies = localStorage.getItem('savedMovies')
            setIsLoading(true);
            if (!JSON.parse(storageSavedMovies).length) {
                const allSavedMovies = await mainApi.getMovies();
                setSavedMovies(allSavedMovies);
                localStorage.setItem('savedMovies', JSON.stringify(allSavedMovies));
            } else {
                setSavedMovies(JSON.parse(storageSavedMovies))
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
                            handleCheckbox={handleSavedMoviesCheckbox}
                            isChecked={isSavedMoviesChecked}
                            query={savedMoviesQuery}
                            setQuery={setSavedMoviesQuery}
                            queryMovies={savedQueryMovies}
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            getMovies={getMainSavedMovies}
                            setMovieError={setMovieError}
                        />
                        <SavedMoviesCardList
                            savedMovies={savedMovies}
                            deleteMovie={deleteMovie}
                            queryMovies={savedQueryMovies}
                            query={savedMoviesQuery}
                            isLoading={isLoading}
                        />
                    </>
                }
            </main>
            <Footer />
        </section>
    )
}

export default SavedMovies;
