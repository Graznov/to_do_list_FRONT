import styles from "./RightlogoSignUp_Login.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export const RightLogoSignUp_Login = () => {

    return(
        <div className={cx('registr_container_right')}>
            <img className={cx('imgRightLogoSignUp_Login')}
                src=".\public\log_in_logo.png"
                alt="logo"
            />
        </div>
    )
}