import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useEffect, useState } from "react";

function MoviesCardList({ savedMovies, movies, deleteMovie, saveMovie, queryMovies,
    setQueryMovies, isChecked, isLoading, setMovies, query, movieError }) {
    const LG_ROW_CARD_COUNT = 3;
    const MD_ROW_CARD_COUNT = 2;
    const SM_ROW_CARD_COUNT = 1;

    const LG_INITIAL_CARD_COUNT = 12;
    const MD_INITIAL_CARD_COUNT = 8;
    const SM_INITIAL_CARD_COUNT = 5;

    const isDesktop = useMediaQuery("(min-width: 1140px)");
    const isTablet = useMediaQuery("(min-width: 708px)");

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

    const handleClick = () => {
        calculateCardCount();
    };

    useEffect(() => {
        setVisibleCardCount(initialCardCount);
    }, [initialCardCount])

    const calculateCardCount = () => {
        if (isDesktop) {
            return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
        }

        if (isTablet) {
            return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
        }

        setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT + 1);
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
            {query && movieError && <span>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span>}
            {!isLoading && <span>Ничего не найдено</span>}
            {queryMovies.length > roundedVisibleCardCount && <button className="movies__loader-button" type="button" onClick={handleClick} aria-label="загрузить больше фильмов">Ещё</button>}
        </section>
    )
}

export default MoviesCardList;