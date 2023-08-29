import "./SearchForm.css";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useEffect } from "react";

function SearchForm({
    handleCheckbox,
    isChecked,
    query,
    setQuery,
    setQueryMovies,
    setIsLoading,
    movies,
    savedMovies, 
    onSubmit}) {

    const location = useLocation();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onSubmit",
    });

    // useEffect(() => {
    //     handleSubmit(handleFormSearch)();
    // }, [isChecked])

    async function handleFormSearch(value) {
        setIsLoading(true);

        if (location.pathname === '/movies') {
            await onSubmit()
        }

        const { movie } = value;
        
        const moviesForSearch = location.pathname === '/movies' ? movies : savedMovies;
        console.log(moviesForSearch);

        setQueryMovies(isChecked ?
            moviesForSearch.filter((i) => {
                return (i.nameRU.toLowerCase() || i.nameEN.toLowerCase()).includes(movie.toLowerCase())
                    &&
                    (i.duration <= 40);
            })
            :
            moviesForSearch.filter((i) => {
                return (i.nameRU.toLowerCase() || i.nameEN.toLowerCase()).includes(movie.toLowerCase());
            })
        );
        setQuery(movie);
        setIsLoading(false);
    }

    return (
        <section className="search-movie">
            <form className="search-movie__container" onSubmit={handleSubmit(handleFormSearch)}>
                <label className="search-movie__logo" htmlFor="search-movie-input" />
                <input className="search-movie__input"
                    id="search-movie-input"
                    name="movie"
                    placeholder="Фильм"
                    type="text"
                    {...register("movie", {
                        required: "Нужно ввести ключевое слово",
                        value: query,
                    })}
                />
                <button className="search-movie__button" type="submit" aria-label="найти фильм" />
            </form>
            <span className="search-movie__input-error">{errors?.movie?.message || " "}</span>
            <FilterCheckbox handleCheckbox={handleCheckbox} isChecked={isChecked} />
        </section>
    )
}

export default SearchForm;