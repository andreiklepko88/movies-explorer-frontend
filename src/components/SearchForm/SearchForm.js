import "./SearchForm.css";
import { useForm } from "react-hook-form";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleCheckbox, isChecked, query, setQuery }) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: "onSubmit",
    });


    function handleFormEditProfile(value) {
        const {movie} = value;
        setQuery(movie);
    }

    return (
        <section className="search-movie">
            <form className="search-movie__container" onSubmit={handleSubmit(handleFormEditProfile)}>
                <label className="search-movie__logo" htmlFor="search-movie-input"/>
                <input className="search-movie__input"
                    id="search-movie-input"
                    name="movie"
                    placeholder="Фильм"
                    type="text"
                    {...register("movie", {
                        required: "Нужно ввести ключевое слово",
                        value: query,
                        minLength: {
                            value: 2,
                            message: "Название должно быть не менее двух символов",}
                    })}
                 />
                <button className="search-movie__button" type="submit" aria-label="найти фильм" />
            </form>
            <span className="search-movie__input-error">{errors?.movie?.message || " "}</span>
            <FilterCheckbox handleCheckbox={ handleCheckbox } isChecked={isChecked} />
        </section>
    )
}

export default SearchForm;