import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleCheckbox }) {
    return (
        <section className="search-movie">
            <form className="search-movie__container">
                <div className="search-movie__logo"/>
                <input className="search-movie__input" name="movie" placeholder="Фильм" type="text" required/>
                <button className="search-movie__button" aria-label="найти"/>
            </form>
            <FilterCheckbox handleCheckbox={ handleCheckbox } />
        </section>
    )
}

export default SearchForm;