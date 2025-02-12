import styles from "./logInWind.module.css";
import {Input} from "../ui-kit/Input.tsx";
import Btn from "../ui-kit/Btn.tsx";
import {FocusEvent, useEffect, useState} from "react";
import classNames from "classnames/bind";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Store/hooks.ts";
import {russ} from "../../Store/Ru.ts";
import {eng} from "../../Store/En.ts";
import {setEmailNewAccWindowToLoginWindow, setLang} from "../../Store/styleSlise.ts";
// import {
//     setAccessToken,
//     setCreatDat,
//     setEmail,
//     setId,
//     setName,
//     setTasks,
// } from "../../Store/defSlice.ts";

const cx = classNames.bind(styles);


export const LogInWind = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const lang = useAppSelector(state => state.styleSlice.language)
    const theme = useAppSelector(state => state.styleSlice.theme)
    const emailFromRegistrationWindow = useAppSelector(state => state.styleSlice.emailNewAccWindowToLoginWindow)
    // const data = useAppSelector(state => state.defSlice)



    useEffect(() => {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', lang)
        } else {
            dispatch(setLang(localStorage.getItem('lang')));

        }
    })
    const langMap = lang === 'ru' ? russ : eng


    const [formLogin, setFormLogin] = useState({
        email: (emailFromRegistrationWindow.length!==0)?emailFromRegistrationWindow:'',
        password: '',
    })

    const ClassBtn = cx('classNameBtn', {
        classNameBtnDiss: (!formLogin.email || !formLogin.password),
        'classNameBtnDiss_dark':theme==='dark' && (!formLogin.email || !formLogin.password),
        'classNameBtn_dark':theme=='dark'
    })
    const [upper, setUpper] = useState(false) //для загл буквы пароля
    const [numberInPass, setNumberInPass] = useState(false)


    const [emailDirty, setEmailDirty] = useState(false)
    const [emailBorder, setEmailBorder] = useState(false)
    const [emailError, setEmailError] = useState(langMap.logInWindEmailError)

    const [passOneDirty, setPassOneDirty] = useState(false)
    const [passOneError, setPassOneError] = useState(langMap.logInWindPassError)

    const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
        switch (e.target.name){
            case 'email':
                if(!formLogin.email){
                    setEmailDirty(true)
                    setEmailBorder(true)
                }
                break
            case 'passOne':
                if (passOne.length<6 || passOne.length>250){
                    setPassOneDirty(true)
                    setPassOneError(langMap.logInWindPassErrorOne)
                    break
                } else if(!numberInPass && !upper){
                    // console.log(`passOne: ${passOne} is good`)
                    setPassOneDirty(true)
                    setPassOneError(langMap.logInWindPassErrorTwo)
                } else if(passOne.length>6 && numberInPass && upper){
                    setPassOneDirty(false)
                    setPassOneError('')
                    setFormLogin({
                        ...formLogin,
                        password: passOne
                    })
                    break

                }
                break
        }
    }

    const ClassInputEmail = cx('classNameInputEmail',{
        classNameInput_red:emailDirty && emailBorder,
        'classNameInput_dark':theme === 'dark',
    });
    const ClassLabelEmail = cx('classNameLabelEmail',{
        classNameLabel_red:emailDirty && emailBorder,
        'classNameLabel_black':theme === 'dark',
    });
    const ClassInputPass = cx('classNameInputPass',{
        classNameInput_red:passOneDirty,
        'classNameInput_dark':theme === 'dark',
    });
    const ClassLabelPass = cx('classNameLabelPass',{
        classNameLabel_red:passOneDirty,
        'classNameLabel_black':theme === 'dark',
    });


// проверка почты...
    const changeEmail = (e: { target: { value: string; }; }) => {

        if(emailFromRegistrationWindow.length!==0){
            dispatch(setEmailNewAccWindowToLoginWindow(''))
            setFormLogin({
                ...formLogin,
                email: ''
            })
        }

        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        function isEmailValid (value: string){
            return EMAIL_REGEXP.test(value);
        }

        setFormLogin({
            ...formLogin,
            email: e.target.value
        })

        if(isEmailValid(e.target.value)){
            // setFormLogin({
            //     ...formLogin,
            //     email: e.target.value
            // })
            setEmailDirty(!emailDirty)
            setEmailBorder(false)
            setEmailError('')
        } else {
            setEmailError(langMap.logInWindEmailErrorOne)
            setEmailBorder(true)
        }

    }
// ...проверка почты

// проверка пароля...

    const [passOne,  setPassOne] = useState('')

    const changePassOne = (e: { target: { value: string; }; }) => {
        const elem = e.target.value
        setPassOne(elem)
    }
    useEffect(()=>{
        passOne.split('').forEach(i =>{
            if (!isNaN(Number(i))){
                setNumberInPass(true)
            }else if(isNaN(Number(i)) && i===i.toUpperCase()) {
                setUpper(true)
            }

        }, [passOne])
    })

// ...проверка пароля


// кнопка показать/скрыть пароль:
    const [adress, setAdress] = useState('public/hide_icon.svg')
    const [isShown, setIsShown] = useState(false)
    const isShowChange = () => {
        setIsShown(!isShown)
        setAdress((adress==='public/hide_icon.svg')?'public/show_icon.svg':'public/hide_icon.svg')
    }

// ... показать/скрыть пароль

     const clickEnter = async () => {

         fetch(`http://localhost:3000/lists/login`, {
             method: 'POST', // Указываем метод запроса
             headers: {
                 'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
             },
             credentials: "include",
             body: JSON.stringify(formLogin)
         })
             .then((response) => {
                 if (!response.ok) {
                     throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                 }
                 return response.json()
             })
             .then((data) => {
                 console.log('Данные получены', data)
                 localStorage.setItem('accessToken', data)

                 navigate('/workwindow/today')
             })
             .catch((err) => {
                 console.log('Произошла ошибка', err.message)
             })

         // setCookies()


        console.log('Push button Enter');
    }

    // function setCookies(){
    //     fetch(`http://localhost:3000/lists/set-cookie`, {
    //         method: 'GET', // Метод запроса
    //         credentials: 'include' // Важно для отправки/получения cookie
    //     })
    //         .then(response => response.text()) // Читаем ответ как текст
    //         .then(data => {
    //             console.log(data); // Выводим ответ сервера ("Cookie has been set!")
    //         })
    //         .catch(error => {
    //             console.error('Ошибка:', error);
    //         });
    // }


    return(

        <div className={cx('containerLogIn')}>

            <h3 className={cx('input_area_Zag', {
                'input_area_Zag_dark': theme === 'dark'
            })}>
                {langMap.logIn}
            </h3>


            <form className={styles.input_area}>

                <Input
                    // value={(formLogin.email.length!==0)?formLogin.email:''}
                    value={formLogin.email}
                    name='email'
                    onBlur={e => blurHandler(e)}
                    onChange={changeEmail}
                    classNameContainer={styles.classNameContainer}
                    classNameLabel={ClassLabelEmail}
                    classNameInput={ClassInputEmail}
                    placeholder=''
                    type='email'
                    hiddenStr={langMap.logInWindHiddenEmail}
                    ClassDivError={cx('ClassDivError', {
                        ClassDivErrorVisibl: emailDirty
                    })}
                    message={emailError}
                    classNameBtn={styles.classInputBtn}

                />

                <Input
                    name='passOne'
                    onBlur={e => blurHandler(e)}
                    onChange={changePassOne}
                    classNameContainer={styles.classNameContainer}
                    classNameLabel={ClassLabelPass}
                    classNameInput={ClassInputPass}
                    placeholder=''
                    type={isShown ? "text" : "password"}
                    hiddenStr={langMap.logInWindPassHidden}
                    ClassDivError={cx('ClassDivError', {
                        ClassDivErrorVisibl: passOneDirty
                    })}
                    message={passOneError}

                    onClickBtn={isShowChange}
                    src={adress}
                    classNameBtn={styles.classInputBtn}
                />

                <Btn
                    ClassNameBtn={ClassBtn}
                    Btn_text={langMap.logInWindBtn}
                    type='button'
                    Click={clickEnter}
                    status={'true'}
                />

                <div className={cx('toLogin', {
                    'toLogin_dark': theme === 'dark'
                })}>
                    {langMap.logInWinIDont}
                    <NavLink to={'/'}>
                        {langMap.logInWinRegistr}
                    </NavLink>
                </div>

            </form>
        </div>
    )
}