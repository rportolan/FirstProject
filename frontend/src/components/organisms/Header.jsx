import Icon from '../atoms/Icon';
import { Link as RouterLink } from 'react-router-dom';
import profilePicture from '../../assets/profile_picture.svg';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';

const Header = ({ to }) => {
    const location = useLocation();

    // Map des chemins vers les noms des pages
    const pageNames = {
        '/': 'Dashboard',
        '/mygoals': 'Mes objectifs',
        '/newgoal': 'Nouvelle objectif',
        '/calendar': 'Calendrier',
        '/logbook': 'Journal de bord',
        '/settings': 'Settings',
        '/profile': 'Mon profil',
        '/mybook': 'Mon message'
    };

    const pageName = pageNames[location.pathname] || 'Page Not Found';

    return (
        <header className="h-28 p-4 flex items-center justify-between">
            <h2 className='ml-7'>{pageName}</h2>
            <RouterLink to={to}>
            <div className='flex mr-8 hover:bg-secondary p-2 rounded cursor-pointer'>
                <Icon iconPath={profilePicture} width={'w-10'} height={'h-10'}/>
                <div className='ml-4'>
                    <p className='text-sm'>Roméo Portolan</p>
                    <p className='text-xs'>romeo.portolan@outlook.com</p>
                </div>
            </div>
            </RouterLink>

        </header>
    );
};
Header.propTypes = {
    to: PropTypes.string.isRequired,
  };

export default Header;
