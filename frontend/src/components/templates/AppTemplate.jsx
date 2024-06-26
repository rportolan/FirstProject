import Menu from '../organisms/Menu';
import Header from '../organisms/Header';
import PropTypes from 'prop-types';

const AppTemplate = ({ children }) => (
    <div>
        <div className='flex'>
            <Menu />
            <div className='w-screen'>
                <Header to="/profile" /> 
                <main className='mt-12 mb-11 ml-11 mr-14'>{children}</main>
            </div>
        </div>
        
    </div>
);
AppTemplate.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AppTemplate;

