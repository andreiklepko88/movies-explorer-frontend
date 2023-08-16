import "./AboutProject.css"

function AboutProject() {
    return (
        <section className="about" id="about-project">
            <div className="about__wrapper">
                <div className="about__header-wrapper">
                    <h3 className="about__header">О проекте</h3>
                </div>
                <ul className="about__steps">
                    <li className="about__steps-header steps-first"><h3 className="about__steps-header-item">Дипломный проект включал 5 этапов</h3></li>
                    <li className="about__steps-header steps-third"><h3 className="about__steps-header-item">На выполнение диплома ушло 5 недель</h3></li>
                    <li className="about__steps-text steps-second"><p className="about__steps-text-item">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p></li>
                    <li className="about__steps-text steps-fourth"><p className="about__steps-text-item">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p></li>
                </ul>
                <ul className="about__timing">
                    <li className="about__timing-weeks-one"><p className="about__timing-weeks-item">1 неделя</p></li>
                    <li className="about__timing-weeks-four"><p className="about__timing-weeks-item">4 недели</p></li>
                    <li className="about__timing-direction"><p className="about__timing-direction-item">Back-end</p></li>
                    <li className="about__timing-direction"><p className="about__timing-direction-item">Front-end</p></li>
                </ul>
            </div>
        </section>
    )
}

export default AboutProject;