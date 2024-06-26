import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';

const TaskItem = ({ task }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const taskClasses = classNames(
        'flex items-center p-2 rounded m-4',
        {
            'bg-indigo-400': !isChecked,
            'bg-green-400': isChecked,
        }
    );

    return (
        <div className={taskClasses}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="ml-2 form-checkbox h-3 w-3"
            />
            <span className={`ml-4 text-xs ${isChecked ? 'line-through' : 'text-white'}`}>
                {task}
            </span>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.string.isRequired,
};

export default TaskItem;
