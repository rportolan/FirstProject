import MenuTemplate from './components/templates/MenuTemplate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from "./components/pages/Dashboard";
import MyGoals from './components/pages/MyGoals';
import NewGoal from "./components/pages/NewGoal";
import Calendar from './components/pages/Calendar';
import LogBook from './components/pages/LogBook';
import Settings from './components/pages/Settings';





function App() {

  return (
    <>
    <Router>
      <MenuTemplate>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mygoals" element={<MyGoals />} />
          <Route path="/newgoal" element={<NewGoal />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/logbook" element={<LogBook />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MenuTemplate>
    </Router>
    </>
  )
}

export default App
