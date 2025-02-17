import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import TitleLogo from '../atoms/TitleLogo';
import LinkMenu from '../molecules/LinkMenu';
import iconDashboard from '../../assets/iconDashboard.svg';
import iconAdd from '../../assets/iconAdd.svg';
import iconBook from '../../assets/iconBook.svg';
import iconCalendar from '../../assets/iconCalendar.svg';
import iconGoal from '../../assets/iconGoal.svg';
import iconSettings from '../../assets/iconSettings.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="md:hidden relative">
            <button 
                className="fixed top-4 left-4 text-2xl z-50"
                onClick={toggleMenu}
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className={`${isOpen ? 'fixed inset-0' : 'hidden'} bg-black flex flex-col items-center border-r border-dotted border-secondary transition-all duration-300 ease-in-out z-40`}>
                <div className="flex items-center justify-center mt-8 mb-4">
                    <div className="mr-4">
                        <Logo width={"w-12"} height={"h-12"} />
                    </div>
                    <TitleLogo fontSize='text-xl' />
                </div>
                <nav className='mt-4'>
                    <ul className="flex flex-col items-center">
                        <li className="mb-2" onClick={() => handleLinkClick('/')}>
                            <LinkMenu iconPath={iconDashboard} to="/">Dashboard</LinkMenu>
                        </li>
                        <li className="mb-2" onClick={() => handleLinkClick('/mygoals')}>
                            <LinkMenu iconPath={iconGoal} to="/mygoals">Mes objectifs</LinkMenu>
                        </li>
                        <li className="mb-2" onClick={() => handleLinkClick('/newgoal')}>
                            <LinkMenu iconPath={iconAdd} to="/newgoal">Nouvelle objectif</LinkMenu>
                        </li>
                        <li className="mb-2" onClick={() => handleLinkClick('/calendar')}>
                            <LinkMenu iconPath={iconCalendar} to="/calendar">Calendrier</LinkMenu>
                        </li>
                        <li className="mb-2" onClick={() => handleLinkClick('/logbook')}>
                            <LinkMenu iconPath={iconBook} to="/logbook">Journal de bord</LinkMenu>
                        </li>
                        <li className="mb-2" onClick={() => handleLinkClick('/settings')}>
                            <LinkMenu iconPath={iconSettings} to="/settings">Settings</LinkMenu>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
