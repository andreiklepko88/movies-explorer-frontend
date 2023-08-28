import "./Profile.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import { useState } from "react";


function Profile({ logOut, isLoggedIn, handleMenuOpen, onEdit, onError }) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onChange",
    });

    const [isEditingModeOn, setIsEditingModeOn] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const handleEditButton = () => {
        setIsEditingModeOn(true);
    }

    function handleFormEditProfile(values) {
        const { name, email } = values;
        onEdit(name, email);
        reset();
        setIsEditingModeOn(false);
    }


    return (
        <section>
            <Header
                isLoggedIn={!isLoggedIn}
                handleMenuOpen={handleMenuOpen}
            />
            <main>
                <div className="profile">
                    <h2 className="profile__header">Привет, {currentUser.name}!</h2>
                    <div className="profile__form-wrapper">
                        <form className="profile__form" onSubmit={handleSubmit(handleFormEditProfile)}>
                            <fieldset className="profile__input-fieldset">
                                <div className="profile__input-wrapper">
                                    <label className="profile__label-name" htmlFor="profile-name-input">Имя</label>
                                    <input className="profile__input-name"
                                        id="profile-name-input"
                                        name="name"
                                        type="text"
                                        placeholder="Ваше имя"
                                        {...register("name", {
                                            required: "Поле обязательно для заполнения",
                                            minLength: {
                                                value: 2,
                                                message: "Имя должно быть не менее двух букв",
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: "Имя должно быть не более тридцати букв",
                                            },
                                            pattern: {
                                                value: /^[А-ЯA-Zё\s\_\h-]+$/i,
                                                message: "Допускается латиница, кириллица, пробел или дефис",
                                            },
                                            value: currentUser.name,
                                        })}
                                    />
                                </div>
                                <span className="profile__input-error">{errors?.name?.message || " "}</span>
                            </fieldset>
                            <fieldset className="profile__input-fieldset">
                                <div className="profile__input-wrapper">
                                    <label className="profile__label-email" htmlFor="profile-email-input">E-mail</label>
                                    <input className="profile__input-email"
                                        id="profile-email-input"
                                        name="email"
                                        type="email"
                                        placeholder="Ваш E-mail"
                                        {...register("email", {
                                            required: "Поле обязательно для заполнения",
                                            maxLength: {
                                                value: 50,
                                                message: "Email должен быть не более пятидесяти символов",
                                            },
                                            pattern: {
                                                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                                message: "Введите электронную почту",
                                            },
                                            value: currentUser.email,
                                        })}
                                    />
                                </div>
                                <span className="profile__input-error">{errors?.email?.message || " "}</span>
                            </fieldset>
                            <span className="profile__error">{onError ? `${onError}` : " "}</span>
                            {isEditingModeOn ? (
                                <div className="profile__save-container">
                                    <button className="profile__save-button" disabled={!isValid} type="submit" aria-label="сохранить изменения">Сохранить</button>
                                </div>
                            ) : (
                                <div className="profile__button-container">
                                    <span className="profile__edit-button" onClick={handleEditButton} aria-label="редактировать профиль">Редактировать</span>
                                    <span className="profile__logout-button" onClick={logOut} aria-label="Выйти из аккаунта">Выйти из аккаунта</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Profile;