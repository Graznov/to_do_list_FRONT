import styles from './note.module.css'
import classNames from "classnames/bind";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks.ts";
import {setNewNote_redactedNote, setNoteRedactWindVisible, setPencil} from "../../../../Store/styleSlise.ts";
import {useEffect, useState} from "react";
import {addNewNote, deleteNote, setRedactedNote, updateNoteList} from "../../../../Store/defSlice.ts";
import {ReactComponent as CloseSvg} from "/src/assets/close-square-svgrepo-com.svg";
import {ReactComponent as ScrepSvg} from "/src/assets/skrep.svg";
import {ReactComponent as SaveSvg} from "/src/assets/save2.svg";
import {ReactComponent as LogoTrash} from "/src/assets/trash2.svg";
import {ReactComponent as PensilSvg} from "/src/assets/pencil2.svg";
import {russ} from "../../../../Store/Ru.ts";
import {eng} from "../../../../Store/En.ts";




const cx = classNames.bind(styles);

function getRandomNumber():number { //рандомное число от -3 до 3 для угла поворота карточки
    const random = Math.random() * 7; // 7, потому что Math.random() не включает верхнюю границу
    return Math.floor(random) - 3;
}



function NewNote(){
    const dispatch = useAppDispatch()

    const visible = useAppSelector(state => state.styleSlice.noteWindRedactVisible)
    const lang = useAppSelector(state => state.styleSlice.language)
    const theme = useAppSelector(state => state.styleSlice.theme)
    const visiblBtnDelete = useAppSelector(state => state.styleSlice.newNote_redactedNote)
    const redactedNote = useAppSelector(state => state.defSlice.redactedNote)
    const pencil = useAppSelector(state => state.styleSlice.pencil)

    const [DeletedWind, setDeletedWind] = useState<boolean>(false)



    const NOTE_START = {
        id: ``,
        title: '',
        description: '',
        addDate:'',
        lastRedactDate: '',
        color: '',
        deg: 0
    }

    const [noteData, setNoteData] = useState(NOTE_START);
    document.addEventListener('keydown', function(event) {
        if (event.code == 'Escape') {
            if(visible) {
                dispatch(setNoteRedactWindVisible(false))
                dispatch(setNewNote_redactedNote(false))
                setNoteData(NOTE_START)
                dispatch(setPencil(false))
                setDeletedWind(false)

            }
        }
    });

    useEffect(() => {
        if (redactedNote) {
            setNoteData(redactedNote);
        } else {
            setNoteData(NOTE_START);
        }
    }, [redactedNote]);

    function createdDate(){
        return new Date(new Date().toISOString()).toLocaleString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
            // timezone: 'UTC',
        })
    }

    // console.log('%c' + `redactedNote:\n${JSON.stringify(redactedNote)}\nNOTE_START:\n${JSON.stringify(NOTE_START)}\nnoteData:\n${JSON.stringify(noteData)}`,'color:orange')

    const [errorText, setErrorText] = useState(false)

    useEffect(() => {

        if(visiblBtnDelete) dispatch(setPencil(true))

    }, [visiblBtnDelete]);

    console.log(`visiblBtnDelete: ${visiblBtnDelete}\npencil: ${pencil}`)

    const langMap = lang === 'ru' ? russ:eng


    return (
        <div className={cx('note_redacted', {
            'note_redacted_visible': visible,
            'note_redacted_dark': theme === 'dark'

        })}>
            <button
                className={cx('note_redacted_btnClose', {})}
                onClick={() => {
                    // dispatch(setPencil(true))
                    setNoteData(NOTE_START)
                    dispatch(setNoteRedactWindVisible(false))
                    dispatch(setNewNote_redactedNote(false))
                    dispatch(setRedactedNote(undefined))
                    dispatch(setPencil(false))
                    setDeletedWind(false)

                    console.log(`visible: ${visible}`)
                }}>
                <CloseSvg/>
            </button>
            <input
                className={cx('note_redacted_title')}
                disabled={pencil}

                value={noteData.title}
                type="text"
                onChange={(e) => setNoteData({
                    ...noteData,
                    title: e.target.value
                })}
            />
            <textarea
                className={cx('note_redacted_text', {
                    'note_redacted_text_ERROR': errorText
                })}
                disabled={pencil}
                value={noteData.description}
                onChange={(e) => setNoteData({
                    ...noteData,
                    description: e.target.value
                })}
            />

            <div className={cx('AddTaskContainerTop_colrs_btnArea')}>
                <button
                    disabled={pencil}
                    onClick={() => {
                        setNoteData({
                            ...noteData,
                            color: 'red'
                        })
                    }}
                    type='button'
                    className={cx('AddTaskContainerTop_colrs_btn', 'red', {
                        colorActive: noteData.color === 'red'
                    })}>
                    <ScrepSvg/>
                </button>
                <button
                    disabled={pencil}
                    onClick={() => {
                        setNoteData({
                            ...noteData,
                            color: 'green'
                        })
                    }}
                    type='button'
                    className={cx('AddTaskContainerTop_colrs_btn', 'green', {
                        colorActive: noteData.color === 'green'
                    })}>
                    <ScrepSvg/>
                </button>
                <button
                    disabled={pencil}
                    onClick={() => {
                        setNoteData({
                            ...noteData,
                            color: 'blue'
                        })
                    }}
                    type='button'
                    className={cx('AddTaskContainerTop_colrs_btn', 'blue', {
                        colorActive: noteData.color === 'blue'
                    })}>
                    <ScrepSvg/>
                </button>
                <button
                    disabled={pencil}
                    onClick={() => {
                        setNoteData({
                            ...noteData,
                            color: 'yellow'
                        })
                    }}
                    type='button'
                    className={cx('AddTaskContainerTop_colrs_btn', 'yellow', {
                        colorActive: noteData.color === 'yellow'
                    })}>
                    <ScrepSvg/>
                </button>
                <button
                    disabled={pencil}
                    onClick={() => {
                        setNoteData({
                            ...noteData,
                            color: 'purple'
                        })
                    }}
                    type='button'
                    className={cx('AddTaskContainerTop_colrs_btn', 'purple', {
                        colorActive: noteData.color === 'purple'
                    })}>
                    <ScrepSvg/>
                </button>
            </div>


            <div className={cx('note_redacted_bottom_btnArea')}>
                <button
                    className={cx('note_redacted_btn', 'note_redacted_btn-PensilSave')}
                    onClick={() => {

                            if (noteData.description) {

                                if (visiblBtnDelete) {

                                    if(!pencil) {
                                        console.log('%c'+'111111111','color: #FABD2F')
                                        dispatch(updateNoteList({
                                            ...noteData,
                                            lastRedactDate: createdDate()
                                        }))
                                        setNoteData(NOTE_START)
                                        dispatch(setRedactedNote(undefined))
                                        dispatch(setNoteRedactWindVisible(false))
                                        dispatch(setNewNote_redactedNote(false))
                                        // setSwitchRedactedNote(false)
                                        dispatch(setPencil(false))
                                    } else {

                                        console.log('%c'+'22222222222','color: #FABD2F')
                                        dispatch(setPencil(false))

                                    }

                                    console.log('%c'+'Редактирование записи','color: #FABD2F')

                                } else {
                                    console.log('%c'+'Новая запись','color: #FABD2F')

                                    dispatch(addNewNote({
                                        ...noteData,
                                        id: `${Math.random().toString(36)}_${new Date().getTime()}_${Math.random().toString(36)}`,
                                        deg: getRandomNumber(),
                                        addDate: createdDate()
                                    }))
                                    setNoteData(NOTE_START)
                                    dispatch(setNoteRedactWindVisible(false))

                                }

                            } else {
                                setErrorText(true)
                                setTimeout(() => {
                                    setErrorText(false)
                                }, 500)

                            }
                    }}
                > {(pencil) ? <PensilSvg/> : <SaveSvg/>}</button>

                <button
                    className={cx('note_redacted_btn', 'note_redacted_btn-Trash', {
                        'note_redacted_btn-Trash_Deactivat': !visiblBtnDelete
                    })}
                    onClick={() => {
                        setDeletedWind(true)
                    }}>
                    <LogoTrash/>
                </button>
            </div>

            <div className={cx('askDel', {
                'askDel_dark': theme === 'dark',
                'askDel_visible': DeletedWind
            })}>
                <div>
                    {langMap.change_task_wind_deleted_title}
                </div>
                <div className={cx('askDel_btn_area')}>
                    <button onClick={() => {
                        dispatch(deleteNote(noteData.id))
                        setNoteData(NOTE_START)
                        dispatch(setNoteRedactWindVisible(false))
                        setDeletedWind(false)
                        dispatch(setNewNote_redactedNote(false))
                        dispatch(setPencil(false))


                        // setSwitchRedactedNote(false)
                    }}>
                        {langMap.change_task_wind_deleted_OK}
                    </button>
                    <button onClick={() => {
                        setDeletedWind(false)
                        // setSwitchRedactedNote(false)
                    }}>
                        {langMap.change_task_wind_deleted_NO}
                    </button>
                </div>
            </div>


        </div>
    )
}

export default NewNote