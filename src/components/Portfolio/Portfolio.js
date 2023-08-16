import "./Portfolio.css";

function Portfolio() {
    return(
    <nav className="about-me__portfolio">
        <h3 className="about-me__portfolio-title">Портфолио</h3>
        <ul className="about-me__portfolio-list">
            <li className="about-me__portfolio-link">
                <a className="about-me__portfolio-link-item" href="https://github.com/andreiklepko88/how-to-learn" target="_blank" rel="noreferrer">
                    <span>Статичный сайт</span>
                    <span className="about-me__portfolio-arrow">↗</span>
                </a>
            </li>
            <li className="about-me__portfolio-link portfolio-border">
                <a className="about-me__portfolio-link-item" href="https://github.com/andreiklepko88/russian-travel" target="_blank" rel="noreferrer">
                    <span>Адаптивный сайт</span>
                    <span className="about-me__portfolio-arrow">↗</span>
                </a>
            </li>
            <li className="about-me__portfolio-link">
                <a className="about-me__portfolio-link-item" href="https://github.com/andreiklepko88/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
                    <span>Одностраничное приложение</span>
                    <span className="about-me__portfolio-arrow">↗</span>
                </a>
            </li>
        </ul>
    </nav>
    )
}

export default Portfolio;