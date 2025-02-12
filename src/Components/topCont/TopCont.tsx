import styles from "./topCont.module.css";
import classNames from "classnames/bind";
import {useAppSelector} from "../../Store/hooks.ts";
import {ReactComponent as NoteLogo} from "/src/assets/note.svg";
import {useEffect} from "react";

const cx = classNames.bind(styles);

function TopCont(){

    useEffect(() => {
        document.title = 'maybe later...'
    }, []);

    const theme = useAppSelector(state => state.styleSlice.theme)
    return(
        <div className={cx('top_cont',{
            'top_cont_dark':theme === 'dark'
        })}>
            <NoteLogo className={cx('notesLogo',{
                'notesLogo_dark':theme==='dark'
            })}/>

            <h1>maybe later...</h1>
        </div>
    )
}

export default TopCont
