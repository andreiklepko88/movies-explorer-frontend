import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useState, useEffect } from "react";
import { moviesApi } from "../../utils/MoviesApi";

function MoviesCardList({ savedMovies, movies, deleteMovie, saveMovie, queryMovies,
    setQueryMovies, isChecked, setIsLoading, setMovies, query, movieError }) {
    const LG_ROW_CARD_COUNT = 3;
    const MD_ROW_CARD_COUNT = 2;
    const SM_ROW_CARD_COUNT = 1;

    const LG_INITIAL_CARD_COUNT = 12;
    const MD_INITIAL_CARD_COUNT = 8;
    const SM_INITIAL_CARD_COUNT = 5;

    const isDesktop = useMediaQuery("(min-width: 1280px)");
    const isTablet = useMediaQuery("(min-width: 768px)");

    const cardColumnCount = isDesktop
        ? LG_ROW_CARD_COUNT
        : isTablet
            ? MD_ROW_CARD_COUNT
            : SM_ROW_CARD_COUNT;

    const initialCardCount = isDesktop
        ? LG_INITIAL_CARD_COUNT
        : isTablet
            ? MD_INITIAL_CARD_COUNT
            : SM_INITIAL_CARD_COUNT;

    const [visibleCardCount, setVisibleCardCount] = useState(
        initialCardCount
    );

    const roundedVisibleCardCount =
        Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

    // useEffect(() => {
    //     // const localStorageMovies = localStorage.getItem('movies');
    //     moviesApi.getMovies()
    //         .then((movie) => setMovies(movie));
    // }, []);

    const handleClick = () => {
        calculateCardCount();
    };

    const calculateCardCount = () => {
        if (isDesktop) {
            return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
        }

        if (isTablet) {
            return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
        }

        setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
    };

    console.log('queryMovies', queryMovies)

    return (
        <section className="movies">
            <ul className="movies__list">
                {query && queryMovies?.slice(0, roundedVisibleCardCount).map((movie) =>
                    <MoviesCard
                        key={movie.id}
                        movie={movie}
                        savedMovies={savedMovies}
                        deleteMovie={deleteMovie}
                        saveMovie={saveMovie}
                    />
                )
                }
            </ul>
            {query && movieError && <span>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span> }
            {query && !queryMovies.length && <span>Ничего не найдено</span>}
            {queryMovies.length > roundedVisibleCardCount && <button className="movies__loader-button" type="button" onClick={handleClick} aria-label="загрузить больше фильмов">Ещё</button>}
        </section>
    )
}

export default MoviesCardList;