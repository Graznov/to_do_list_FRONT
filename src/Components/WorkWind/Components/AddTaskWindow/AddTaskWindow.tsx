import styles from './addTaskWindow.module.css'
import classNames from "classnames/bind";
import {useEffect, useState} from "react";
import {ReactComponent as CloseSvg} from "/src/assets/close-square-svgrepo-com.svg";
import {addTask} from "../../../../Store/defSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks.ts";
import {change_input_AddTaskWind, styleVisibleAddTask} from "../../../../Store/styleSlise.ts";
import {eng} from "../../../../Store/En.ts";
import {russ} from "../../../../Store/Ru.ts";


const cx = classNames.bind(styles);

export const AddTaskWindow = () => {

    const lang = useAppSelector(state => state.styleSlice.language)
    // const lang = localStorage.getItem('lang')


    const arrayTags: Array<string> = useAppSelector(state => state.styleSlice.tags)

    const errorInput = useAppSelector(state => state.styleSlice.input_AddTaskWind)
    const theme = useAppSelector(state => state.styleSlice.theme)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(change_input_AddTaskWind('CANCEL'))
        }, 1300)
        return () => {
            clearTimeout(timer)
        }
    }, [errorInput]);


    const styleWindAddTask = useAppSelector(state => state.styleSlice.visibleAddTask)
    const dispatch = useAppDispatch()
    const [vall, setVall] = useState({
        id: '',
        title: '',
        description: '',
        dueDate: '',
        category: '',
        color: '',
        isCompleted: false
    })
    useEffect(() => {
        setVall({
            id: '',
            title: '',
            description: '',
            dueDate: '',
            category: '',
            color: '',
            isCompleted: false
        })
    }, [styleWindAddTask]);


    const ClassAddTask = cx('AddTaskContainer', {
        'AddTaskContainer_dark':theme==='dark',
        'AddTaskContainer_Visible': styleWindAddTask,
    })


    useEffect(() => {
    }, [vall.color]);

    document.addEventListener('keydown', function(event) {
        if (event.code == 'Escape') {
            if(styleWindAddTask) dispatch(styleVisibleAddTask(false))
        }
    });

    const closeWindowAddTask = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault()
        dispatch(styleVisibleAddTask(false))
        setVall(vall)
    }

    const yourDate = new Date().toISOString().split('T')[0]

    const langMap = lang === 'ru' ? russ:eng

    return (
        <form
            className={ClassAddTask}>

            <button
                onClick={closeWindowAddTask}
                // type='button'
                className={cx('close')}>
                <CloseSvg/>
            </button>

            <div className={cx('AddTaskContainerTop')}>
                <input
                    className={cx('addTaskContainerTopInput', {
                        'addTaskContainerTopInput_RED': !errorInput.inputTitle
                    })}
                    type='text'
                    value={vall.title}
                    placeholder={langMap.add_task_wind_title}
                    onChange={(e) => {
                        setVall({
                            ...vall,
                            title: e.target.value
                        })
                    }}
                />
                <input
                    className={cx('addTaskContainerTopInput', {
                        'addTaskContainerTopInput_RED': !errorInput.inputTag
                    })}
                    type='text'
                    placeholder={langMap.add_task_wind_tag}
                    value={vall.category}
                    onChange={(e) => {
                        setVall({
                            ...vall,
                            category: e.target.value
                        })
                    }}
                />

                <div className={cx("dropdown")}>
                    <button type='button' className={cx("dropbtn")}>
                        {langMap.add_task_wind_btnTag}
                    </button>
                    <div className={cx("dropdown-content",{
                        'dropdown-content_dark':theme==='dark'
                    })}>
                        {
                            arrayTags.map(tag =>
                                <button
                                    className={cx({'button_dark':theme==='dark'})}
                                    onClick={()=>{
                                        setVall({
                                            ...vall,
                                            category: tag
                                        })
                                    }}
                                    type='button'
                                    key={tag}>
                                {tag}
                                </button>
                            )
                        }
                    </div>
                </div>

                <div
                    className={cx('AddTaskContainerTop_colrs')}>
                    <span>
                        {langMap.add_task_wind_addColor}
                    </span>
                    <div className={cx('AddTaskContainerTop_colrs_btnArea')}>
                        <button
                                onClick={()=>{
                                    setVall({
                                        ...vall,
                                        color: 'red'
                                    })
                                }}
                                type='button'
                                className={cx('AddTaskContainerTop_colrs_btn', 'red', {
                                    colorActive: vall.color === 'red'
                                })}>
                        </button>
                        <button
                                onClick={()=>{
                                    setVall({
                                        ...vall,
                                        color: 'green'
                                    })
                                }}
                                type='button'
                                className={cx('AddTaskContainerTop_colrs_btn', 'green', {
                                    colorActive: vall.color === 'green'
                        })}>
                        </button>
                        <button
                                onClick={()=>{
                                    setVall({
                                        ...vall,
                                        color: 'blue'
                                    })
                                }}
                                type='button'
                                className={cx('AddTaskContainerTop_colrs_btn', 'blue', {
                                    colorActive: vall.color === 'blue'
                        })}>
                        </button>
                        <button
                            onClick={()=>{
                                setVall({
                                    ...vall,
                                    color: 'yellow'
                                })
                            }}
                            type='button'
                            className={cx('AddTaskContainerTop_colrs_btn', 'yellow', {
                                colorActive: vall.color === 'yellow'
                        })}>
                        </button>
                        <button
                            onClick={()=>{
                                setVall({
                                    ...vall,
                                    color: 'purple'
                                })
                            }}
                            type='button'
                            className={cx('AddTaskContainerTop_colrs_btn', 'purple', {
                                colorActive: vall.color === 'purple'
                        })}>
                        </button>
                    </div>

                </div>
                <div className={cx('AddTaskContainerTop_dateTimecontainer')}>
                    <input
                        className={cx('addTaskContainerTopInput', 'addTaskContainerTopInput_Date', {
                            'addTaskContainerTopInput_RED': !errorInput.inputDate
                        })}
                        // type="datetime-local"
                        type='date'
                        min={yourDate}
                        value={vall.dueDate.split('T')[0]}
                        onChange={(e) => {
                            setVall({
                                ...vall,
                                dueDate: e.target.value
                            })
                        }}
                    />

                </div>

            </div>

            <textarea
                placeholder={langMap.add_task_wind_description}
                rows={4}
                value={vall.description}
                onChange={(e) => {
                    setVall({
                        ...vall,
                        description: e.target.value
                    })
                }}/>
            <button
                // type='button'
                onClick={(evt) => {
                    evt.preventDefault()
                    console.log('evt.preventDefault()')
                    if (vall.title && vall.category && vall.dueDate) {
                        dispatch(styleVisibleAddTask(false))

                        dispatch(
                            addTask({
                                    id: `${vall.title} ${Math.floor(Math.random() * 1000)}`,
                                    title: vall.title,
                                    description: vall.description,
                                    dueDate: vall.dueDate+'T00:00:00.000Z',
                                    category: vall.category,
                                    color: vall.color,
                                    isCompleted: false
                                }
                            ))
                    } else {
                        console.log('add Title, Tag, Date')
                        if (!vall.title) {
                            dispatch(change_input_AddTaskWind('NO TITLE'))
                        }
                        if (!vall.category) {
                            dispatch(change_input_AddTaskWind('NO TAG'))
                        }
                        if (!vall.dueDate) {
                            dispatch(change_input_AddTaskWind('NO DATA'))
                        }

                    }

                }} className={cx('AddTaskContainerBtn',{
                        'AddTaskContainerBtn_dark':theme==='dark'
            })}>
                <span>
                    {langMap.add_task_wind_btnAdd}
                </span>
            </button>

        </form>
    );
};