
import Logo from '../atoms/Logo';
import TitleLogo from '../atoms/TitleLogo';
import LinkMenu from '../molecules/LinkMenu';
import iconDashboard from '../../assets/iconDashboard.svg';
import iconAdd from '../../assets/iconAdd.svg';
import iconBook from '../../assets/iconBook.svg';
import iconCalendar from '../../assets/iconCalendar.svg';
import iconGoal from '../../assets/iconGoal.svg';
import iconSettings from '../../assets/iconSettings.svg';

const Menu = () => (
    <div className="w-64 min-h-screen flex flex-col items-center border-r border-dotted border-secondary">
        <div className="flex items-center justify-center mt-8 mb-4">
            <div className="mr-4">
                <Logo width={"w-12"} height={"h-12"}/>
            </div>
            <TitleLogo fontSize='text-xl'/>
        </div>
        <nav className='mt-8'>
            <ul className="flex flex-col items-center">
                <LinkMenu iconPath={iconDashboard} to="/">Dashboard</LinkMenu>
                <LinkMenu iconPath={iconGoal} to="/mygoals">Mes objectifs</LinkMenu>
                <LinkMenu iconPath={iconAdd} to="/newgoal">Nouvelle objectif</LinkMenu>
                <LinkMenu iconPath={iconCalendar} to="/calendar">Calendrier</LinkMenu>
                <LinkMenu iconPath={iconBook} to="/logbook">Journal de bord</LinkMenu>
                <LinkMenu iconPath={iconSettings} to="/settings">Settings</LinkMenu>
            </ul>
        </nav>
    </div>
);

export default Menu;



