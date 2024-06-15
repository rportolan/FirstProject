import PropTypes from 'prop-types';
import logo from "../../assets/logo_one_goal.svg";

const Logo = ({width, height}) => {
    return(
        <>
        <img src={logo} alt="Logo One Goal" className={`${width} ${height}`} />
        </>
    )
}
Logo.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
  };
export default Logo;