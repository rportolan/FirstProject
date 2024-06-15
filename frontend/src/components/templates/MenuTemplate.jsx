import Menu from '../organisms/Menu';
import PropTypes from 'prop-types';

const MenuTemplate = ({ children }) => (
    <div>
        <Menu />
        <main>{children}</main>
    </div>
);
MenuTemplate.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default MenuTemplate;
