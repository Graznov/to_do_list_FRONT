import styles from "./newAccount.module.css";
import {Input} from "../ui-kit/Input.tsx";
import Btn from "../ui-kit/Btn.tsx";
import {FocusEvent, useEffect, useState} from "react";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../Store/hooks.ts";
import {setLang} from "../../Store/styleSlise.ts";
import {russ} from "../../Store/Ru.ts";
import {eng} from "../../Store/En.ts";

const cx = classNames.bind(styles);


export const NewAccount = () => {

    const dispatch = useAppDispatch()

    const lang = useAppSelector(state => state.styleSlice.language)
    const theme = useAppSelector(state => state.styleSlice.theme)

    useEffect(() => {
        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', lang)
        } else {
            dispatch(setLang(localStorage.getItem('lang')));

        }
    })
    const langMap = lang === 'ru' ? russ : eng

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const ClassBtn = cx('classNameBtn', {
        'classNameBtnDiss': (!form.name || !form.email || !form.password),
        'classNameBtnDiss_dark':theme==='dark' && (!form.name || !form.email || !form.password),
        'classNameBtn_dark':theme=='dark'
    })
    const [upper, setUpper] = useState(false) //для загл буквы пароля
    const [numberInPass, setNumberInPass] = useState(false)

    const [temp, setTemp] = useState('')
    const [nameCorrectSimbol, setNameCorrectSimbol] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [nameBorder, setNameBorder] = useState(false)
    const [nameError, setNameError] = useState(langMap.RegistrWinNameError)

    const [emailDirty, setEmailDirty] = useState(false)
    const [emailBorder, setEmailBorder] = useState(false)
    const [emailError, setEmailError] = useState(langMap.RegistrWinNameError)

    const [passOneDirty, setPassOneDirty] = useState(false)
    const [passOneError, setPassOneError] = useState(langMap.RegistrWinNameError)

    const [passTwoDirty, setPassTwoDirty] = useState(false)
    const [passTwoError, setPassTwoError] = useState(langMap.RegistrWinNameError)


    const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
        switch (e.target.name){
            case 'name':
                if(temp.length>5){
                    setForm({
                        ...form,
                        name: temp
                    })
                } else {
                    setNameError(langMap.RegistrWinNameErrorOne)
                    setNameDirty(true)
                    setNameBorder(true)
                }

                break
            case 'email':
                if(!form.email){
                    setEmailDirty(true)
                    setEmailBorder(true)
                }
                break
            case 'passOne':
                if (passOne.length<6 || passOne.length>250){
                    setPassOneDirty(true)
                    setPassOneError(langMap.RegistrWinPassOneError)
                    break
                }
                if(numberInPass && upper){
                    // console.log(`passOne: ${passOne} is good`)
                    setPassOneDirty(false)
                    setPassOneError('')
                    break
                } else {
                    setPassOneDirty(true)
                    setPassOneError(langMap.RegistrWinPassOneErrorOne)
                }
                break
            case 'passTwo':
                setPassTwoDirty(true)
                if(form.password){
                    setPassTwoError('')
                    setPassTwoDirty(false)
                }
                if(!passTwo){
                    setPassTwoError(langMap.RegistrWinNameError)
                    setPassTwoDirty(true)
                }
                break
        }
    }

    const ClassInput = cx('classNameInput',{
        classNameInput_red:nameDirty && nameBorder,
        'classNameInput_dark':theme === 'dark',
    });
    const ClassLabel = cx('classNameLabel',{
        classNameLabel_red:nameDirty && nameBorder,
        'classNameLabel_black':theme === 'dark',
    });

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

    const ClassInputPassTwo = cx('classNameInputPassTwo',{
        classNameInput_red:passTwoDirty,
        'classNameInput_dark':theme === 'dark',
    });
    const ClassLabelPassTwo = cx('classNameLabelPassTwo',{
        classNameLabel_red:passTwoDirty,
        'classNameLabel_black':theme === 'dark',
    });

// проверка имени...

    const validVall:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_1234567890'

    useEffect(()=>{
        const time = setTimeout(()=>{
            setNameDirty(false)
            setNameBorder(false)
            setNameError('')
            setNameCorrectSimbol(false)
        },1000)
        return () => {clearTimeout(time)}
    },[nameCorrectSimbol])


    const changeName = (e: { target: { value: string; }; }) => {

        const elem = e.target.value
        if(elem.length===0)setTemp('')
        if(validVall.includes(elem[elem.length-1])){
            setTemp(elem)
            setNameError('')
            setNameBorder(false)
        } else {
            setNameError(langMap.RegistrWinErrorSimbol)
            setNameDirty(true)
            setNameBorder(true)
            setNameCorrectSimbol(true)
            e.target.value = temp
        }
    }


// ...проверка имени

// проверка почты...
    const changeEmail = (e: { target: { value: string; }; }) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        function isEmailValid (value: string){
            return EMAIL_REGEXP.test(value);
        }
        if(isEmailValid(e.target.value)){
            setForm({
                ...form,
                email: e.target.value
            })
            setEmailDirty(!emailDirty)
            setEmailBorder(false)
            setEmailError('')
        } else {
            setEmailError(langMap.RegistrWinInvalidEmail)
            setEmailBorder(true)
        }
    }
// ...проверка почты

// проверка пароля...

    const [passOne,  setPassOne] = useState('')
    const [passTwo,  setPassTwo] = useState('')

    // const [len, setLen] = useState(true)
    // const [equality, setEquality] = useState(true)

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
    const changePassTwo = (e: { target: { value: string; }; }) => {
        const elem = e.target.value
        setPassTwo(elem)

        if(passOne === elem){
            setForm({
                ...form,
                password: elem
            })
            setPassTwoError('')
            setPassTwoDirty(false)
        } else {
            setPassTwoError(langMap.RegistrWinErrorPasswords)
            setPassTwoDirty(true)
        }
    }
// ...проверка пароля


// кнопка показать/скрыть пароль:
    const [adress, setAdress] = useState('public/hide_icon.svg')
    const [isShown, setIsShown] = useState(false)
    const isShowChange = () => {
        setIsShown(!isShown)
        setAdress((adress==='public/hide_icon.svg')?'public/show_icon.svg':'public/hide_icon.svg')
    }
    // useEffect(()=>{
    // },[isShown])

    const [adressTwo, setAdressTwo] = useState('public/hide_icon.svg')
    const [isShownTwo, setIsShownTwo] = useState(false)
    const isShowChangeTwo = () => {
        setIsShownTwo(!isShownTwo)
        setAdressTwo((adressTwo==='public/hide_icon.svg')?'public/show_icon.svg':'public/hide_icon.svg')
    }
// ... показать/скрыть пароль

    return(

        <div className={cx('registrContainer')}>

            <h3 className={cx('input_area_Zag',{
                'input_area_Zag_dark':theme==='dark'
            })}>
                {langMap.registration}
            </h3>

                <form className={styles.input_area}>


                    <Input
                        name='name'
                        value={temp}
                        onBlur={e => blurHandler(e)}
                        onChange={changeName}
                        classNameContainer={cx('classNameContainer')}
                        classNameLabel={ClassLabel}
                        classNameInput={ClassInput}
                        placeholder=''
                        type='text'
                        hiddenStr={langMap.RegistrWinUserName}
                        ClassDivError={cx('ClassDivError',{
                            ClassDivErrorVisibl:nameDirty
                        })}
                        message={nameError}
                        classNameBtn={styles.classInputBtn}

                    />

                    <Input
                        name='email'
                        onBlur={e => blurHandler(e)}
                        onChange={changeEmail}
                        classNameContainer={styles.classNameContainer}
                        classNameLabel={ClassLabelEmail}
                        classNameInput={ClassInputEmail}
                        placeholder=''
                        type='email'
                        hiddenStr={langMap.RegistrWinEmail}
                        ClassDivError={cx('ClassDivError',{
                            ClassDivErrorVisibl:emailDirty
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
                        hiddenStr={langMap.RegistrWinSetPassword}
                        ClassDivError={cx('ClassDivError',{
                            ClassDivErrorVisibl:passOneDirty
                        })}
                        message={passOneError}

                        onClickBtn={isShowChange}
                        src={adress}
                        classNameBtn={styles.classInputBtn}
                    />

                    <Input
                        name='passTwo'
                        onBlur={e => blurHandler(e)}
                        onChange={changePassTwo}
                        classNameContainer={styles.classNameContainer}
                        classNameLabel={ClassLabelPassTwo}
                        classNameInput={ClassInputPassTwo}
                        placeholder=''
                        // type='password'
                        type={isShownTwo ? "text" : "password"}
                        hiddenStr={langMap.RegistrWinConfirmPassword}
                        ClassDivError={cx('ClassDivError',{
                            ClassDivErrorVisibl:passTwoDirty
                        })}
                        message={passTwoError}
                        src={adressTwo}
                        onClickBtn={isShowChangeTwo}
                        // btnImg={adressTwo}
                        // alt="show/hide icon"/>)}
                        classNameBtn={styles.classInputBtn}
                    />

                    <Btn
                        ClassNameBtn={ClassBtn}
                        Btn_text={langMap.RegistrWinBtnRegistr}
                        type='submit'
                    />
                    <div className={cx('toLogin',{
                        'toLogin_dark':theme==='dark'
                    })}>
                        {langMap.RegistrWinAlrHavAnAcc}
                        <NavLink to={'/login'}>
                            {langMap.RegistrWinBtnLogIn}
                        </NavLink>
                    </div>

                </form>
            </div>
    )
}