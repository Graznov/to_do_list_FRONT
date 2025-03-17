import styles from './note.module.css'
import classNames from "classnames/bind";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks.ts";
import {ReactComponent as Pencil} from "/public/pencil.svg";
import {setNewNote_redactedNote, setNoteRedactWindVisible} from "../../../../Store/styleSlise.ts";
import {setRedactedNote} from "../../../../Store/defSlice.ts";
import {russ} from "../../../../Store/Ru.ts";
import {eng} from "../../../../Store/En.ts";


const cx = classNames.bind(styles);

interface propsNote {
    id: string,
    title: string,
    description: string,
    addDate: string,
    lastRedactDate: string,
    color: string,
    deg:number
}

function Note(propsNote: propsNote) {

    const dispatch = useAppDispatch()
    const lang = useAppSelector(state => state.styleSlice.language)


    const [visible, setVisible] = useState(false)

    const NOTE_START = {
        id: propsNote.id,
        title: propsNote.title,
        description: propsNote.description,
        addDate: propsNote.addDate,
        lastRedactDate: propsNote.lastRedactDate,
        color: propsNote.color,
        deg: propsNote.deg,
    }

    // console.log(`NOTE_START:\n${JSON.stringify(NOTE_START)}`)

    const style = {
        transform: `rotate(${NOTE_START.deg}deg)`,
    };

    const langMap = lang === 'ru' ? russ:eng

    return(
        <>
            <div
                style={style}
                className={cx("note", {
                    'note_red': NOTE_START.color === 'red',
                    'note_green': NOTE_START.color === 'green',
                    'note_yellow': NOTE_START.color === 'yellow',
                    'note_blue': NOTE_START.color === 'blue',
                    'note_purple': NOTE_START.color === 'purple',
                })}>

                <button
                    className={cx("note_btn_redacted")}
                    onClick={() => {
                        dispatch(setRedactedNote(NOTE_START))
                        setVisible(!visible)
                        dispatch(setNewNote_redactedNote(true))
                        dispatch(setNoteRedactWindVisible(true))
                    }}>
                    <Pencil/>
                </button>
                <div className={cx('note_date_Add')}>
                    {/*<p>Добавлено:</p>*/}
                    {NOTE_START.addDate}
                </div>
                <div>
                    <div className={cx("note_title")}>{NOTE_START.title}</div>
                    <textarea
                        disabled={true}
                        className={cx('note_text')}
                        value={NOTE_START.description}/>

                    {/*</textarea>*/}

                    <div className={cx('note_date_Change')}>
                        <p>{langMap.noteCardChange}</p>
                        {NOTE_START.lastRedactDate}
                    </div>

                </div>
            </div>

        </>

    )
}

export default Note;