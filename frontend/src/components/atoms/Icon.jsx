import PropTypes from 'prop-types';

const Icon = ({ iconPath, width, height }) => {
    return(
        <>
        <img src={iconPath} alt="icon" className={`${width} ${height}`} />
        </>
    )
}
Icon.propTypes = {
    iconPath: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string
  };
export default Icon;