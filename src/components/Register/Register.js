import "./Register.css";
import Logo from "../../images/logo-header-resized.svg";
import { Link } from "react-router-dom";

function Register() {
    return(
        <section className="register">
            <div className="register__wrapper">
                <Link to="/" className="register__logo-link">
                    <img className="register__logo" src={Logo} alt="логотип" />
                </Link>
                <h2 className="register__header">Добро пожаловать!</h2>
                <form className="register__form">
                    <fieldset className="register__fieldset">
                        <label className="register__label" for="name">Имя</label>
                        <input className="register__input" id="name" name="register-name" value={"Виталий"} type="text" placeholder="Ваше имя" required/>
                    </fieldset>
                    <fieldset className="register__fieldset">
                        <label className="register__label" for="email">E-mail</label>
                        <input className="register__input" id="email" name="register-email" value={"pochta@yandex.ru"} type="email" placeholder="Ваш E-mail" required/>
                    </fieldset>
                    <fieldset className="register__fieldset">
                        <label className="register__label" for="password">Пароль</label>
                        <input className="register__input" id="password" name="register-password" value={"12345678910"} type="password" placeholder="Пароль" required/>
                        <span className="register__error">Что-то пошло не так...</span>
                    </fieldset>                    
                </form>
                <button className="register__button" aria-label="Зарегистрироваться">Зарегистрироваться</button>
                <div className="register__link-wrapper">
                    <span className="register__question">Уже зарегистрированы?</span>
                    <Link className="register__link" to="/signin">Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;