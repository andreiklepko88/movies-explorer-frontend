import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckbox }) {

    return (
        <div className="checkbox">
            <input className="checkbox-button" type="checkbox" id="switch" onChange={handleCheckbox} />
            <label className="checkbox-label" for="switch"/>
            <span className="checkbox-text">Короткометражки</span>
        </div>
    )
}

export default FilterCheckbox;