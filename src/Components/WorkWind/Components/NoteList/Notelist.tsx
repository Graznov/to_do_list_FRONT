import styles from './notelist.module.css'
import classNames from "classnames/bind";
import Note from "../note/Note.tsx";

const cx = classNames.bind(styles);

function NoteList(){

    document.title = 'Заметки'

    return(

            <div className={cx('cont')}>

                {/*<div className={cx('note-list_Title')}>Заметки</div>*/}

                {/*<div className={cx('note-list')}>*/}


                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>

                {/*</div>*/}
            </div>



    )

}

export default NoteList;