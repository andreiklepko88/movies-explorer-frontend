import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-3, {replace:true});
    }


    return (
        <section className="not-found">
            <div className="not-found__container">
                <h2 className="not-found__header">404</h2>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <button className="not-found__button" type="button" aria-label="Назад" onClick={goBack}>Назад</button>
        </section>
    )
}

export default NotFound;

