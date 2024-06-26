import PropTypes from 'prop-types';

const CalendarDashboard = ({ date }) => {
    const tasks = [
        'Learn React',
    ];

    const objectives = [
        'Complete React course',
        'Finish project setup',
    ];

    const subObjectives = [
        'Watch module 1 videos'
    ];

    return (
        <div className="p-4 w-full mb-4 bg-tertiary rounded">
            <h2 className="text-sm">{date}</h2>
            <div className="mt-4">
                <ul>
                    {objectives.map((objective, index) => (
                        <li key={index} className="list-none m-1.5">
                            <p className="text-xs">Objectif : {objective}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {subObjectives.map((subObjective, index) => (
                        <li key={index} className="list-none m-1.5">
                            <p className="text-xs">Sous-Objectif : {subObjective}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className="list-none m-1.5">
                            <p className="text-xs">Task : {task}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
CalendarDashboard.propTypes = {
    date: PropTypes.string.isRequired,
};

export default CalendarDashboard;

