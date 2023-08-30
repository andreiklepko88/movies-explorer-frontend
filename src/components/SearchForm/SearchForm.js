import "./SearchForm.css";
import { useForm } from "react-hook-form";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
    handleCheckbox,
    isChecked,
    query,
    setQuery,    
    setIsLoading,
    getMovies,
    }) {

    // const location = useLocation();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onSubmit",
    });

    async function handleFormSearch(value) {
        try {
            setIsLoading(true);
            await setQuery(value.movie);
            await getMovies();
        } catch (e) {
            setIsLoading(false);
        }
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
