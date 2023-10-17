import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckbox, isChecked=false }) {

    return (
        <div className="checkbox">
            <input className="checkbox-button" type="checkbox" id="switch" onChange={handleCheckbox} checked={isChecked} />
            <label className="checkbox-label" htmlFor="switch"/>
            <span className="checkbox-text">Короткометражки</span>
        </div>
    )
}

export default FilterCheckbox;