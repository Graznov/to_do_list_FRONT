interface forBtn{
    Btn_text:string,
    ClassNameBtn:string,
    type:string,
    Click:()=>void
}


function Btn({
                Btn_text,
                ClassNameBtn,
                type,
                Click

                // disabled
             }:forBtn){

    return(
        <button
            className={ClassNameBtn}
            // disabled
            onClick={Click}
            type={type}>
            {Btn_text}
        </button>
    )
}

export default Btn