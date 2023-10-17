import "./Promo.css";
import promoLogo from "../../images/planet_landing-logo-resized.svg";

function Promo() {

    const scrollAbout = () => {
        const about = document.getElementById('about-project');
        about.scrollIntoView({behavior: "smooth" });
    }

    return (
        <section className="promo">
            <div className="promo__wrapper">
                <div className="promo__container">
                    <div className="promo__text">
                        <h1 className="promo__header">
                            Учебный проект студента факультета Веб-разработки.
                        </h1>
                        <p className="promo__subtitle">
                            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                        </p>
                    </div>
                    <img className="promo__logo" alt="логотип" src={promoLogo} />
                </div>
                <button className="promo__button" onClick={() => scrollAbout() } aria-label="Узнать больше">Узнать больше</button>
            </div>
        </section>
    )
}

export default Promo;