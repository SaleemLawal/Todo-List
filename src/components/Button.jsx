import PropTypes from 'prop-types';

//button template
const ButtonItem = (props) => {
    return (
        <button onClick={props.onPressed} className={props.styling}>
            {props.text}
            {props.svg}
        </button>
    )
}
ButtonItem.propTypes = {
    onPressed: PropTypes.func,
    styling: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    svg: PropTypes.node
}
export default ButtonItem