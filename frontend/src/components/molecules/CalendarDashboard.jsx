import PropTypes from 'prop-types';

const CalendarDashboard = ({ date, items }) => {
    return (
        <div className="p-4 w-full mb-4 bg-tertiary rounded">
            <h2 className="text-sm">{date}</h2>
            <div className="mt-4">
                <ul>
                    {items.map((item, index) => (
                        <li key={index} className="list-none m-1.5">
                            <p className="text-xs">{item.type} : {item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

CalendarDashboard.propTypes = {
    date: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default CalendarDashboard;


