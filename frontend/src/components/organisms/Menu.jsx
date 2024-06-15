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
    <div className="w-52 h-screen flex flex-col items-center border-r border-double border-stone-900">
        <div className="flex items-center justify-center mt-8 mb-4">
            <div className="mr-4">
                <Logo width={"w-10"} height={"h-10"}/>
            </div>
            <TitleLogo fontSize='text-xl'/>
        </div>
        <nav className='mt-8'>
            <ul className="flex flex-col items-center">
                <LinkMenu iconPath={iconDashboard} to="/">Dashboard</LinkMenu>
                <LinkMenu iconPath={iconGoal} to="/mygoals">MyGoals</LinkMenu>
                <LinkMenu iconPath={iconAdd} to="/newgoal">NewGoal</LinkMenu>
                <LinkMenu iconPath={iconCalendar} to="/calendar">Calendar</LinkMenu>
                <LinkMenu iconPath={iconBook} to="/logbook">LogBook</LinkMenu>
                <LinkMenu iconPath={iconSettings} to="/settings">Settings</LinkMenu>
            </ul>
        </nav>
    </div>
);

export default Menu;


