import "./SavedMovies.css";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";

function SavedMovies({ handleCheckbox, isLoggedIn, handleMenuOpen, isChecked, isLoading, savedMovies, deleteMovie, saveMovie }) {
    const[savedMoviesQuery, setSavedMoviesQuery] = useState("");
    const[isSavedMoviesChecked, setSavedMoviesChecked] = useState(false);

    function handleSavedMoviesCheckbox() {
        setSavedMoviesChecked(!isSavedMoviesChecked);
    };
    
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
                        <SearchForm handleCheckbox={handleSavedMoviesCheckbox} isChecked={isSavedMoviesChecked} query={savedMoviesQuery} setQuery={setSavedMoviesQuery}/>
                        <SavedMoviesCardList savedMovies={savedMovies} deleteMovie={deleteMovie} query={savedMoviesQuery}/>
                    </main>
                    <Footer />
                </>
            }
        </section>
    )
}

export default SavedMovies;