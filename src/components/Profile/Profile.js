import "./Profile.css";
import Header from "../Header/Header";
import { useState } from "react";


function Profile({ logOut, isLoggedIn, handleMenuOpen }) {
    const [isEditingModeOn, setIsEditingModeOn] = useState(false);

    const handleEditButton = () => {
        setIsEditingModeOn(!isEditingModeOn);
    }
    return(
        <section>
            <Header
            isLoggedIn={isLoggedIn}
            handleMenuOpen={ handleMenuOpen }
            />
            <main>
                <div className="profile">
                    <h2 className="profile__header">Привет, Виталий!</h2>
                    <div className="profile__form-wrapper">
                        <form className="profile__form">
                            <div className="profile__input-wrapper">
                                <label className="profile__label-name">Имя</label>
                                <input className="profile__input-name"
                                id="profile-name-input"
                                name="profile-name"
                                type="text"
                                placeholder="Ваше имя"
                                value={"Виталий"}
                                required
                                />
                            </div>
                            <div className="profile__input-wrapper">
                                <label className="profile__label-email">E-mail</label>
                                <input className="profile__input-email"
                                id="profile-email-input"
                                name="profile-email"
                                type="email"
                                placeholder="Ваш E-mail"
                                value={"pochta@yandex.ru"}
                                required
                                />
                            </div>
                        </form>
                        <span className="profile__error">При обновлении профиля произошла ошибка.</span>
                        { isEditingModeOn ? (
                            <div className="profile__save-container">
                                <button className="profile__save-button" onClick={handleEditButton} aria-label="сохранить изменения">Сохранить</button>
                            </div>
                        ):(
                            <div className="profile__button-container">
                                <button className="profile__edit-button" onClick={handleEditButton} aria-label="редактировать профиль">Редактировать</button>
                                <button className="profile__logout-button" onClick={logOut} aria-label="Выйти из аккаунта">Выйти из аккаунта</button>
                            </div>
                        )}
                    </div>
                </div>
            </main> 
        </section>
    )

}

export default Profile;