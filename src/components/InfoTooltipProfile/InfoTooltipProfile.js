import "./InfoTooltipProfile.css";
import { phrases } from '../../constants/constants';
import successfulTooltip from '../../images/successful-tooltip.svg';
import unSuccessfulTooltip from '../../images/unsuccessful-tooltip.svg';

export default function InfoTooltipProfile({ isOpen, onClose, isSuccessful }) {
    return (
        <div className={`tooltip ${ isOpen && "tooltip_opened"}`}>
            <div className="tooltip__container">
                <figure className="tooltip__figure">
                    <img className="tooltip__image" src={ isSuccessful ? successfulTooltip : unSuccessfulTooltip}
                    alt={ isSuccessful ? phrases.altProfileSuccess : phrases.altProfileUnSuccess}/>
                    <figcaption className="tooltip__caption">
                        { isSuccessful ? phrases.editProfileSuccess :
                         phrases.editProfileUnSuccess } 
                    </figcaption>
                </figure>
                <button className="tooltip__icon-close" type="button" aria-label="закрыть" onClick={onClose}></button>
            </div>
        </div>
    )
}