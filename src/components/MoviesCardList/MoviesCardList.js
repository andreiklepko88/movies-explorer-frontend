import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { cardCounts, minWidth } from "../../constants/constants";

function MoviesCardList({ savedMovies, movies, deleteMovie, saveMovie, queryMovies,
    setQueryMovies, isChecked, isLoading, setMovies, query, movieError }) {


    const isDesktop = useMediaQuery(minWidth.minDesktop);
    const isTablet = useMediaQuery(minWidth.minTablet);

    const cardColumnCount = isDesktop
        ? cardCounts.LG_ROW_CARD_COUNT
        : isTablet
            ? cardCounts.MD_ROW_CARD_COUNT
            : cardCounts.SM_ROW_CARD_COUNT;

    const initialCardCount = isDesktop
        ? cardCounts.LG_INITIAL_CARD_COUNT
        : isTablet
            ? cardCounts.MD_INITIAL_CARD_COUNT
            : cardCounts.SM_INITIAL_CARD_COUNT;

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
            return setVisibleCardCount(visibleCardCount + cardCounts.LG_ROW_CARD_COUNT);
        }

        if (isTablet) {
            return setVisibleCardCount(visibleCardCount + cardCounts.MD_ROW_CARD_COUNT);
        }

        setVisibleCardCount(visibleCardCount + cardCounts.SM_ROW_CARD_COUNT + 1);
    };

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
            {query && !isLoading && !queryMovies.length && <span>Ничего не найдено</span>}
            {queryMovies.length > roundedVisibleCardCount && <button className="movies__loader-button" type="button" onClick={handleClick} aria-label="загрузить больше фильмов">Ещё</button>}
        </section>
    )
}

export default MoviesCardList;
