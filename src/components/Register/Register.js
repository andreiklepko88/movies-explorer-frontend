import "./Register.css";
import { useForm } from "react-hook-form";
import Logo from "../../images/logo-header-resized.svg";
import { Link } from "react-router-dom";
import { regularExpressions } from "../../constants/constants";

function Register({ onSubmit, onError }) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: "all",
    });

    function handleFormRegister(values) {
        const { name, email, password } = values;
        onSubmit(name, email, password);
    }

    return (
        <section className="register">
            <div className="register__wrapper">
                <Link to="/" className="register__logo-link">
                    <img className="register__logo" src={Logo} alt="логотип" />
                </Link>
                <h2 className="register__header">Добро пожаловать!</h2>
                <form className="register__form" onSubmit={handleSubmit(handleFormRegister)}>
                    <fieldset className="register__fieldset">
                        <label className="register__label" for="name">Имя</label>
                        <input className="register__input" name="name" type="text" id="name" placeholder="Ваше имя"
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
                                    value: regularExpressions.name,
                                    message: "Допускается латиница, кириллица, пробел или дефис",
                                },
                            })}
                        />
                        <span className="register__input-error">{errors?.name?.message || " "}</span>
                    </fieldset>
                    <fieldset className="register__fieldset">
                        <label className="register__label" for="email">E-mail</label>
                        <input className="register__input" id="email" name="email" type="email" placeholder="Ваш E-mail"
                            {...register("email", {
                                required: "Поле обязательно для заполнения",
                                maxLength: {
                                    value: 50,
                                    message: "Email должен быть не более пятидесяти символов",
                                },
                                pattern: {
                                    value: regularExpressions.email,
                                    message: "Введите электронную почту",
                                },
                            })}
                        />
                        <span className="register__input-error">{errors?.email?.message || " "}</span>
                    </fieldset>
                    <fieldset className="register__fieldset">
                            <label className="register__label" for="password">Пароль</label>
                            <input className="register__input" id="password" name="password" type="password" placeholder="Пароль"
                                {...register("password", {
                                    required: "Поле обязательно для заполнения",
                                    maxLength: {
                                        value: 50,
                                        message: "Пароль должен быть не более пятидесяти символов",
                                    }
                                })}
                            />
                        <span className="register__input-error">{errors?.password?.message || " "}</span>
                    </fieldset>
                    <span className="register__error">{onError ? `${onError}` : " "}</span>
                    <button className="register__button" type="submit" disabled={!isValid} aria-label="Зарегистрироваться">Зарегистрироваться</button>
                </form>
                <div className="register__link-wrapper">
                    <span className="register__question">Уже зарегистрированы?</span>
                    <Link className="register__link" to="/signin">Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;