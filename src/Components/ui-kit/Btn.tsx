
function Btn({
                Btn_text,
                ClassNameBtn,
                type,
                // disabled
             }){

    return(
        <button
            className={ClassNameBtn}
            disabled
            type={type}>
            {Btn_text}
        </button>
    )
}

export default Btn