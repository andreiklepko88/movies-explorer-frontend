import "./SavedMovies.css";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";

function SavedMovies({
    isLoggedIn,
    handleMenuOpen,
    isLoading,
    savedMovies,
    deleteMovie,
    setIsLoading,
    savedQueryMovies,
    setSavedQueryMovies,
    getMovies,
    setMovieError
}) {
    const [savedMoviesQuery, setSavedMoviesQuery] = useState("");
    const [isSavedMoviesChecked, setSavedMoviesChecked] = useState(false);


    function handleSavedMoviesCheckbox() {
        setSavedMoviesChecked(!isSavedMoviesChecked);
    };

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
                            savedMovies={savedMovies}
                            handleCheckbox={handleSavedMoviesCheckbox}
                            isChecked={isSavedMoviesChecked}
                            query={savedMoviesQuery}
                            setQuery={setSavedMoviesQuery}
                            queryMovies={savedQueryMovies}
                            setIsLoading={setIsLoading}
                            setQueryMovies={setSavedQueryMovies}
                            isLoading={isLoading}
                            getMovies={getMovies}
                            setMovieError={setMovieError}
                        />
                        <SavedMoviesCardList
                            savedMovies={savedMovies}
                            deleteMovie={deleteMovie}
                            queryMovies={savedQueryMovies}
                            query={savedMoviesQuery}
                        />
                    </>
                }
            </main>
            <Footer />
        </section>
    )
}

export default SavedMovies;