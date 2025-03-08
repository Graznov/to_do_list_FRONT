import styles from './note.module.css'
import classNames from "classnames/bind";
import {useState} from "react";

const cx = classNames.bind(styles);

const fish:string = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
    'sed diam voluptua. ' +
    'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

function Note() {

    const [visible, setVisible] = useState(false)


    const title = (t) => {

        return `${t.split(' ')[0]} ${t.split(' ')[1]}`
    }


    return(
        <>
            <div
                className={cx("note", {
                    'note_redacted_visible': visible
                })}
                onClick={() => setVisible(!visible)}>
                <div className={cx("note_title")}>{title(fish)}</div>
                <div className={cx('note_text',{
                    'note_text_hidden': visible
                })}>{fish}</div>

                <textarea value={fish}/>

            </div>


            {/*<div className={cx('note_redacted',{*/}
            {/*    'note_redacted_visible':visible*/}
            {/*})}>*/}

            {/*</div>*/}
        </>

    )
}

export default Note;