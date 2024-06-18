import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';
import { Link as RouterLink } from 'react-router-dom';

const LinkMenu = ({ to, children, iconPath, iconWidth, iconHeight }) => { 
    return (
        <li className="w-full">
            <RouterLink to={to} className='flex items-center px-6 py-2 mt-6 hover:bg-neutral-900 rounded cursor-pointer'>
                <div className='mr-4'>
                    <Icon iconPath={iconPath} iconWidth={iconWidth} iconHeight={iconHeight} />
                </div>
                <p className='text-sm'>{children}</p>
            </RouterLink>
        </li>
    );
};

LinkMenu.propTypes = {
    iconPath: PropTypes.string.isRequired,
    iconHeight: PropTypes.string,
    iconWidth: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default LinkMenu;


