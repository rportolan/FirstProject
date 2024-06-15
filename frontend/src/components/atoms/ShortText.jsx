import PropTypes from 'prop-types';

const ShortText = ({ text, fontSize, color }) => {
    return(
        <>
        <p className={`${fontSize} ${color}`}>{text}</p>
        </>
    )
}
ShortText.propTypes = {
    text : PropTypes.string.isRequired,
    fontSize : PropTypes.string.isRequired,
    color: PropTypes.string
}
export default ShortText;