import "./AboutMe.css";
import profilePhoto from "../../images/my-photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-me__wrapper">
                <div className="about-me__title-wrapper">
                    <h3 className="about-me__title">Студент</h3>
                </div>
                <div className="about-me__profile">
                    <ul className="about-me__profile-list">
                        <li className="about-me__profile-header"><h2 className="about-me__profile-header-item">Андрей</h2></li>
                        <li className="about-me__profile-subtitle"><span className="about-me__profile-subtitle-item">Фронтенд-разработчик, 35 лет</span></li>
                        <li className="about-me__profile-description"><p className="about-me__profile-description-item">
                        Я родился и живу в Москве, закончил институт по инженерной специальности.
                         Я люблю слушать музыку, а ещё увлекаюсь бегом и спортивным туризмом. Очень
                          давно хотел попробовать себя в веб-разработке и курс Яндекс-Практикума
                           стал наиболее подходящим вариантом. После окончания курса планирую
                            найти работу по новой специальности и заниматься фриланс-заказами.
                        </p></li>
                        <li className="about-me__profile-link">
                            <a className="about-me__profile-link-item" href="https://github.com/andreiklepko88" target="_blank" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                    <img className="about-me__profile-photo" src={profilePhoto} alt="фотография студента"/>
                </div>
                <Portfolio />
            </div>
        </section>
    )
}

export default AboutMe;