interface forBtn{
    Btn_text:React.ReactNode,
    ClassNameBtn:string,
    type: "submit" | "reset" | "button",
    Click?:()=>void,
    status?:'true' | 'false',

}


function Btn({
                Btn_text,
                ClassNameBtn,
                type,
                Click,
                // status
            }:forBtn){

    return(
        <button
            // disabled={status}
            className={ClassNameBtn}
            onClick={Click}
            type={type}>
            {Btn_text}
        </button>
    )
}

export default Btn