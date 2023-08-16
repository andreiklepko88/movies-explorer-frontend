import "./Movies.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies ({ handleCheckbox, isLoggedIn, handleMenuOpen }) {
    return (
        <section>
            {
            <>
            <Header
            isLoggedIn={ isLoggedIn }
            handleMenuOpen={ handleMenuOpen }
            />
            <SearchForm handleCheckbox={handleCheckbox} />
            <MoviesCardList/>
            <Footer/>
            </>
            || 
            <Preloader/>
            }
        </section>
    )
}

export default Movies;