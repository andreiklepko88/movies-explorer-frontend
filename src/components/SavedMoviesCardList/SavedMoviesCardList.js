import "./SavedMoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import iconDelete from "../../images/icon-delete-card.svg";
import pictureThree from "../../images/images for cards/card_pic_3.jpg";
import pictureFive from "../../images/images for cards/card_pic_5.jpg";
import pictureTen from "../../images/images for cards/card_pic_10.jpg";

function SavedMoviesCardList() {
    return (
        <section className="saved-movies">
            <ul className="saved-movies__list">
                <MoviesCard movieName={"33 слова о дизайне"} movieDuration={"1ч 47м"} buttonLogo={iconDelete} moviePicture={pictureThree} />
                <MoviesCard movieName={"33 слова о дизайне"} movieDuration={"1ч 47м"} buttonLogo={iconDelete} moviePicture={pictureFive} />
                <MoviesCard movieName={"33 слова о дизайне"} movieDuration={"1ч 47м"} buttonLogo={iconDelete} moviePicture={pictureTen} />
            </ul>
        </section>
    )
}

export default SavedMoviesCardList;