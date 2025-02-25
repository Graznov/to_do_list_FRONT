import classNames from "classnames/bind";
import styles from "./userMenu.module.css";
import {useAppSelector} from "../../../../Store/hooks.ts";
import {russ} from "../../../../Store/Ru.ts";
import {eng} from "../../../../Store/En.ts";

const cx = classNames.bind(styles);

function UserMenu(){

    const data = useAppSelector(state => state.defSlice)
    const theme = useAppSelector(state => state.styleSlice.theme)
    const lang = useAppSelector(state => state.styleSlice.language)

    const pathToImg = 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png'

    console.log(data)

    const langMap = lang === 'ru' ? russ:eng

    return(
        <div className={cx("userMenu",{
            'userMenu_dark':theme === 'dark',
        })}>
            <div>
                <img className={cx('userMenu_avatar')} src={pathToImg} alt="UserAvatar"/>
                <div className={cx('userMenu_Name')}>
                    Your name: {data.name}
                </div>
                <div className={cx('userMenu_Email')}>
                    Your Email: {data.email}
                </div>
            </div>


        </div>
    )

}

export default UserMenu;