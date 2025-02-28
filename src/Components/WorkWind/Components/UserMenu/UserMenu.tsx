import classNames from "classnames/bind";
import styles from "./userMenu.module.css";
import {useAppDispatch, useAppSelector} from "../../../../Store/hooks.ts";
import {russ} from "../../../../Store/Ru.ts";
import {eng} from "../../../../Store/En.ts";
import {useEffect, useState} from "react";
import {cleanTag, setLang, setTheme} from "../../../../Store/styleSlise.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {ReactComponent as CloseSvg} from "/src/assets/close-square-svgrepo-com.svg";
// import {ReactComponent as LogoTrash} from "/src/assets/trash.svg";
import {ReactComponent as LogOut} from "/src/assets/logout_icon.svg";
import {ReactComponent as DeleteUser} from "/src/assets/delete_profile_user.svg";

import {resetState, setPathImg} from "../../../../Store/defSlice.ts";


const cx = classNames.bind(styles);

const lightThemePath:string = '/src/assets/day-theme.svg'
const darkThemePath:string = '/src/assets/night-theme.svg'
const us:string = '/src/assets/flag-us-svgrepo-com.svg'
const ru:string = '/src/assets/flag-ru-svgrepo-com.svg'

function UserMenu(){

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const data = useAppSelector(state => state.defSlice)
    const theme = useAppSelector(state => state.styleSlice.theme)
    const lang = useAppSelector(state => state.styleSlice.language)
    const userId = useAppSelector(state => state.defSlice.id)
    const pathPhoto = useAppSelector(state => state.defSlice.pathImg)
    const userEmail = useAppSelector(state => state.defSlice.email)
    const pathToImg = useAppSelector(state => state.styleSlice.pathToImg)

    const [pathImgLang, setPathImgLang] = useState(us)
    const [pathImgTheme, setPathImgTheme] = useState(lightThemePath);
    const [inputIdForDelete, setInputIdForDelete] = useState('')
    const [visibleBtnDelete, setVisibleBtnDelete] = useState<boolean>(true)
    const [visibleContainerDelete, setVisibleContainerDelete] = useState<boolean>(false)

    useEffect(()=>{
        if(!localStorage.getItem('lang')){
            localStorage.setItem('lang', lang)
        }
        dispatch(setLang(localStorage.getItem('lang')));
        (lang==='ru')?setPathImgLang(ru):setPathImgLang(us);
    }, [dispatch, lang])

    useEffect(() => {
        if(!localStorage.getItem('theme')){
            localStorage.setItem('theme', theme)
        }

        if(localStorage.getItem('theme')==='light') {
            setPathImgTheme(lightThemePath)
            dispatch(setTheme('light'))
        } else if(localStorage.getItem('theme')==='dark') {
            setPathImgTheme(darkThemePath);
            dispatch(setTheme('dark'))
        }

    }, []);

    const changeTheme = () => {
        if(theme==='light') {
            setPathImgTheme(darkThemePath)
            dispatch(setTheme('dark'))
            localStorage.setItem('theme', 'dark')
        } else if(theme==='dark') {
            setPathImgTheme(lightThemePath);
            dispatch(setTheme('light'))
            localStorage.setItem('theme', 'light')

        }
    }
    const changeLanguage = () => {
        if(pathImgLang===us){
            setPathImgLang(ru)
            dispatch(setLang('ru'))
            localStorage.setItem('lang', 'ru')
        } else if(pathImgLang===ru){
            setPathImgLang(us)
            dispatch(setLang('en'))
            localStorage.setItem('lang', 'en')
        }
    }


    function inputDelete(e){
        setInputIdForDelete(e.target.value)
        if(e.target.value===userEmail){
            setVisibleBtnDelete(false)
        } else {
            setVisibleBtnDelete(true)
        }
        console.log(inputIdForDelete)
    }


    // console.log(data)

    function delCookies(){
        fetch('http://localhost:3000/lists/del-cookie', {
            method: 'POST', // Метод запроса
            credentials: 'include' // Важно для отправки/получения cookie
        })
            .then(response => response.text()) // Читаем ответ как текст
            .then(data => {
                console.log(data); // Выводим ответ сервера ("Cookie has been set!")
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

    function cleanData(){
        delCookies()
        localStorage.removeItem('accessToken')
        localStorage.removeItem('_id')
        // dispatch(setTasks([]))

        dispatch(cleanTag())
        dispatch(resetState())
    }

    const langMap = lang === 'ru' ? russ:eng

    const [file, setFile] = useState(null);
    console.log(file)
    // Обработчик, который положит файл в стейт
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Обработчик для отпавки файла
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что файл выбран
        if (!file) {
            alert("Файл не выбран");
            return;
        }

        // Создаем FormData
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Ошибка загрузки");
            }

            const data = await response.json();
            console.log("Файл успешно загружен:", data);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        }
    };

    return(
        <div className={cx("userMenu", {
            'userMenu_dark': theme === 'dark',
        })}>

            <div className={cx('userMenu_Data')}>

                <div className={cx('containerPhoto')}>

                    <img
                        src={(pathPhoto.length)?pathPhoto:pathToImg}
                        className={cx('img')}/>
                    <label htmlFor="file-upload" className={cx('custom-file-upload')}></label>
                    <input onChange={
                        // (e)=>{
                        //     const reader = new FileReader();
                        //     reader.onload = e => dispatch(setPathImg(e.target.result))
                        //     reader.readAsDataURL(e.target.files[0]);
                        //     setFile(e.target.files[0]);
                        // }
                        handleFileChange
                    } id="file-upload" className={cx('input')} type="file"/>

                </div>

                {/*<img className={cx('userMenu_avatar')} src={pathToImg} alt="UserAvatar"/>*/}

                <div className={cx('userMenu_Data_Right')}>
                    <div className={cx('userMenu_Name')}>
                        <div>
                            {langMap.yourName}
                        </div>
                        <div className={cx('userMenu_span')}>
                            {data.name}
                        </div>
                    </div>
                    <div className={cx('userMenu_Email')}>
                        <div>
                            {langMap.yourEmail}
                        </div>
                        <div className={cx('userMenu_span')}>
                            {data.email}
                        </div>

                    </div>
                </div>

            </div>

            <div className={cx('menu_setting')}>
                <button
                    className={cx('btn_menu', 'btn_menu_theme', 'button_menu_img')}
                    onClick={changeTheme}>
                <img src={pathImgTheme} alt=""/>
                </button>

                <button
                    className={cx('btn_menu', 'button_menu_img')}
                    onClick={changeLanguage}>
                    {/*<span>{langMap.work_left_lang}</span>*/}
                    <img className={cx({'us': pathImgLang === us})} src={pathImgLang} alt=""/>
                </button>

                <button
                    className={cx('btn_menu', 'button_menu_img', 'btn_menu_trash',{
                        'btn_menu_trash_dark': theme === 'dark',
                    })}
                    onClick={() => {
                        setVisibleContainerDelete(!visibleContainerDelete)
                    }}
                ><DeleteUser/>




                </button>
            </div>


            <div className={cx('deleteAkk')}>


                <div className={cx('deleteAkk_hidden', {
                    'deleteAkk_hidden_visible': visibleContainerDelete,
                    'deleteAkk_hidden_dark': theme === 'dark',
                })}>

                    <button
                        className={cx('btnDelAkk_Close_container')}
                        onClick={()=>{setVisibleContainerDelete(!visibleContainerDelete)}}>
                    <CloseSvg/>
                </button>
                <p>
                    {langMap.deleteAkkaunt}
                </p>

                <div className={cx('deleteAkk_Id')}>{userEmail}</div>
                {/*<div>"Я хочу удалить свой аккаунт"</div>*/}

                <div>
                    <input
                        className={cx('input_delete')}
                        type="text"
                        onChange={inputDelete}
                    />
                </div>


                <button
                    className={cx('btn_menu', {
                        'btn_menu_visible': !visibleBtnDelete
                    })}
                    onClick={() => {
                        console.log(`push btn delete account, userId:${userId}`)
                        fetch(`http://localhost:3000/lists/delete/${userId}`, {
                            method: 'DELETE', // Метод запроса
                            credentials: 'include', // Важно для отправки/получения cookie
                            headers: {
                                'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
                                'Authorization': localStorage.getItem('accessToken')!, // Токен передаётся в заголовке
                            },
                        })
                            .then(response => response.text()) // Читаем ответ как текст
                            .then(data => {
                                console.log(data); // Выводим ответ сервера ("Cookie has been set!")
                                localStorage.removeItem('accessToken')
                                localStorage.removeItem('_id')
                                navigate('/login')
                            })
                            .catch(error => {
                                console.error('Ошибка:', error);
                                localStorage.removeItem('accessToken')
                                localStorage.removeItem('_id')
                                navigate('/login')
                            });
                    }}>
                    <span>{langMap.deleteAkkBtn}</span>
                </button>
                </div>
            </div>

            <NavLink
                className={cx('linkLogout',{
                    'linkLogout_dark':theme === 'dark',
                })}
                to={'/login'}
                onClick={() => {
                        cleanData()
                    }
                }>
                <LogOut
                    className={cx('btnLogout')}
                    width={'30px'}/>
            </NavLink>


        </div>
    )

}

export default UserMenu;