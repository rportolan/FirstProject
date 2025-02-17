import { Outlet } from 'react-router-dom';
import Menu from '../organisms/Menu';
import MobileMenu from '../organisms/MobileMenu';
import Header from '../organisms/Header';

const AppTemplate = () => (
    <div className="flex min-h-screen overflow-hidden">
        <Menu /> {/* Menu pour grands écrans */}
        <MobileMenu />
        <div className="flex-1 flex flex-col w-screen">
            <Header to="/profile" />
            <main className="flex-1 overflow-y-auto mt-12 mb-11 md:ml-11 ml-4 md:mr-14 mr-4">
                <Outlet /> {/* Rend les composants enfants des routes */}
            </main>
        </div>
    </div>
);

export default AppTemplate;






