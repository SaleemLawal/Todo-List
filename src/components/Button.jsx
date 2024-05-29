/* eslint-disable react/prop-types */
//button template
const ButtonItem = (props) => {
    return (
        <button onClick={props.onPressed} className={props.styling}>
            {props.text}
            {props.svg}
        </button>
    )
}
export default ButtonItem