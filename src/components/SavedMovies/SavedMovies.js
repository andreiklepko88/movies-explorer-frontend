import "./SavedMovies.css";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ handleCheckbox, isLoggedIn, handleMenuOpen }) {
    return (
        <section>
        {
        <>
        <Header
        isLoggedIn={ isLoggedIn }
        handleMenuOpen={ handleMenuOpen }
        />
        <main>
            <SearchForm handleCheckbox={handleCheckbox} />
            <SavedMoviesCardList/>
        </main>
        <Footer/>
        </>
        || 
        <Preloader/>
        }
    </section>
    )

}

export default SavedMovies;