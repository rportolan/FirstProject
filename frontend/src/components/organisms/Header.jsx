import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import profilePicture from '../../assets/avatar_default.webp';
import PropTypes from 'prop-types';
import getApiUrl from '../services/Api';

const Header = ({ to }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get(getApiUrl('/profile'), {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
            });
        }
    }, [token]);

    const pageNames = {
        '/': 'Dashboard',
        '/mygoals': 'Mes objectifs',
        '/newgoal': 'Nouvel objectif',
        '/calendar': 'Calendrier',
        '/logbook': 'Journal de bord',
        '/settings': 'Paramètres',
        '/profile': 'Mon profil',
        '/logbook/:id': 'Mon message',
        '/goal/:id': 'Mon objectif',
        '/update-goal/:id': 'Modifier mon objectif'
    };

    const getPageName = (pathname) => {
        for (const path in pageNames) {
            const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
            if (regex.test(pathname)) {
                return pageNames[path];
            }
        }
        return 'Page Not Found';
    };

    const pageName = getPageName(location.pathname);

    return (
        <header className="md:h-28 md:p-4 flex items-center justify-between">
            <h2 className='md:pl-7 pl-14 font-bold'>{pageName}</h2>
            {user && (
                <RouterLink to={to}>
                    <div className='flex items-center md:mr-10 mr-4 hover:bg-secondary p-2 rounded cursor-pointer'>
                        <img
                            src={user.profile_picture ? getApiUrl(`/uploads/${user.profile_picture}`) : profilePicture}
                            alt="Profile"
                            className="md:w-14 md:h-14 w-10 h-10 rounded-full object-cover"
                        />
                        <div className='ml-4 hidden md:block'>
                            <p className='text-sm'>{user.surname_user} {user.name_user}</p>
                            <p className='text-xs'>{user.email_user}</p>
                        </div>
                    </div>
                </RouterLink>
            )}
        </header>
    );
};

Header.propTypes = {
    to: PropTypes.string.isRequired,
};

export default Header;



