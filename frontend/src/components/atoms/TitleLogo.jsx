import PropTypes from 'prop-types';

const TitleLogo = ({ fontSize }) => {
    return(
        <>
        <h1 className={fontSize}>One Goal</h1>
        </>
    )
}
TitleLogo.propTypes = {
    fontSize: PropTypes.string.isRequired,
  };
export default TitleLogo;