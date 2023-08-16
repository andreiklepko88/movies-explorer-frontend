import "./Techs.css";

function Techs() {
    return (
        <section className="techs">
            <div className="techs__wrapper">
                <div className="techs__header-wrapper">
                    <h3 className="techs__header">Технологии</h3>
                </div>
                <ul className="techs__text-list">
                    <li className="techs__text-header"><p className="techs__text-header-item">7 технологий</p></li>
                    <li className="techs__text"><p className="techs__text-item">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p></li>
                </ul>
                <ul className="techs__list">
                    <li className="techs__cell"><span className="techs__item">HTML</span></li>
                    <li className="techs__cell"><span className="techs__item">CSS</span></li>
                    <li className="techs__cell"><span className="techs__item">JS</span></li>
                    <li className="techs__cell"><span className="techs__item">React</span></li>
                    <li className="techs__cell"><span className="techs__item">Git</span></li>
                    <li className="techs__cell"><span className="techs__item">Express.js</span></li>
                    <li className="techs__cell"><span className="techs__item">mongoDB</span></li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;