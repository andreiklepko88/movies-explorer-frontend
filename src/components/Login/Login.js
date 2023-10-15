import "./Login.css";
import { useForm } from "react-hook-form";
import Logo from "../../images/logo-header-resized.svg";
import { Link } from "react-router-dom";
import { regularExpressions } from "../../constants/constants";

function Login({ onSubmit, onError }) {

    const {
        register,
        formState: { errors, isValid, isSubmitting },
        handleSubmit,
    } = useForm({
        mode: "all",
    });

    function handleFormLogin(values) {
        const { email, password } = values;
        onSubmit(email, password);
    }

    return (
        <section className="login">
            <div className="login__wrapper">
                <Link to="/" className="login__logo-link">
                    <img className="login__logo" src={Logo} alt="логотип" />
                </Link>
                <h2 className="login__header">Рады видеть!</h2>
                <form className="login__form" onSubmit={handleSubmit(handleFormLogin)}>
                    <fieldset className="login__fieldset">
                        <label className="login__label" htmlFor="email">E-mail</label>
                        <input
                        className="login__input"
                        id="email" name="login-email"
                        type="email"
                        placeholder="Ваш E-mail"
                        disabled={isSubmitting}
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
                        <span className="login__input-error">{errors?.email?.message || " "}</span>
                    </fieldset>
                    <fieldset className="login__fieldset">
                        <label className="login__label" htmlFor="password">Пароль</label>
                        <input
                        className="login__input"
                        id="password" name="login-password"
                        type="password"
                        placeholder="Пароль"
                        disabled={isSubmitting}
                            {...register("password", {
                                required: "Поле обязательно для заполнения",
                                maxLength: {
                                    value: 50,
                                    message: "Пароль должен быть не более пятидесяти символов",
                                }
                            })}
                        />
                        <span className="login__input-error">{errors?.password?.message || " "}</span>
                    </fieldset>
                    <span className="login__error">{onError ? `${onError}` : " "}</span>
                    <button className="login__button" disabled={isSubmitting || !isValid} type="submit" aria-label="авторизоваться">Войти</button>
                </form>
                <div className="login__link-wrapper">
                    <span className="login__question">Ещё не зарегистрированы?</span>
                    <Link className="login__link" to="/signup">Регистрация</Link>
                </div>
            </div>
        </section>
    )
}

export default Login;