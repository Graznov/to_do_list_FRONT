import styles from './leftPanelBtn.module.css'
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

const cx = classNames.bind(styles);

interface propsLeftPanelBtn {
    className:string|undefined,
    Click: ()=>void,
    adress:string,
    text_btn:string,
    number:string|undefined,
    logo?: JSX.Element,
    logo2?: JSX.Element
}

function LeftPanelBtn({className, Click, adress, text_btn, number, logo, logo2}:propsLeftPanelBtn) {

    return (
        <NavLink
            className={className}
            to={adress}>
            <button
                onClick={Click}
                className={cx('button')}>
                <div
                    className={cx('calendar_btn')}>
                    {logo}
                    {text_btn}
                </div>

                <div
                    className={cx('calendar_btn_works')}>
                    {number}
                </div>
                {logo2}
            </button>
        </NavLink>

    );
}

export default LeftPanelBtn;