import PropTypes from 'prop-types';

const Icon = ({ iconPath, iconWidth, iconHeight }) => {
    return(
        <>
        <img src={iconPath} alt="icon" width={iconWidth} height={iconHeight} />
        </>
    )
}
Icon.propTypes = {
    iconPath: PropTypes.string.isRequired,
    iconWidth: PropTypes.string,
    iconHeight: PropTypes.string
  };
export default Icon;