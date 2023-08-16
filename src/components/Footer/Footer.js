import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__info-container">
                    <span className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</span>
                </div>
                <div className="footer__nav-container">
                    <span className="footer__year">&copy;2023</span>
                    <nav className="footer__nav">
                        <ul className="footer__nav-list">
                            <li className="footer__nav-link>"><a className="footer__nav-item" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                            <li className="footer__nav-link>"><a className="footer__nav-item" href="https://github.com" target="_blank" rel="noreferrer">Github</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer;