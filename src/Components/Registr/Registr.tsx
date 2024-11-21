import styles from './registr.module.css'
import TopCont from "../topCont/TopCont.tsx";
import {RightLogoSignUp_Login} from "../RightLogoSignUp_Login/RightLogoSignUp_Login.tsx";
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Store/hooks.ts";
import classNames from "classnames/bind";
import {useEffect} from "react";
import {setTheme} from "../../Store/styleSlise.ts";

const cx = classNames.bind(styles);


function Registr(){

    const dispatch = useAppDispatch()

    const theme = useAppSelector(state => state.styleSlice.theme)

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', theme)
        } else {
            dispatch(setTheme(localStorage.getItem('theme')));

        }
    })
    return(
        <div className={cx('registr_container',{
            'registr_container_dark':theme === 'dark'
        })}>

            <div className={cx('registr_container_left')}>
                <div>
                    <TopCont/>
                </div>
                <NavLink
                    to={'/workwindow'}>
                    временная ссылка на рабочую страницу
                </NavLink>

                <Outlet/>

            </div>

            <div className={cx('registr_container_right')}>

                <RightLogoSignUp_Login/>
            </div>



        </div>
    )
}

export default Registr