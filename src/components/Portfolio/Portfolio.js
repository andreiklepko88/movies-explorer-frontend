import "./Portfolio.css";

function Portfolio() {
    return(
    <nav className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
            <li className="portfolio__link">
                <a className="portfolio__link-item" href="https://github.com/andreiklepko88/how-to-learn" target="_blank" rel="noreferrer">
                    <span className="portfolio__site">Статичный сайт</span>
                    <span className="portfolio__arrow">↗</span>
                </a>
            </li>
            <li className="portfolio__link portfolio__link_border">
                <a className="portfolio__link-item" href="https://github.com/andreiklepko88/russian-travel" target="_blank" rel="noreferrer">
                    <span className="portfolio__site">Адаптивный сайт</span>
                    <span className="portfolio__arrow">↗</span>
                </a>
            </li>
            <li className="portfolio__link">
                <a className="portfolio__link-item" href="https://github.com/andreiklepko88/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
                    <span className="portfolio__site">Одностраничное приложение</span>
                    <span className="portfolio__arrow">↗</span>
                </a>
            </li>
        </ul>
    </nav>
    )
}

export default Portfolio;