import PropTypes from 'prop-types';
import classNames from 'classnames';

const TaskItem = ({ task, onChange }) => {
    if (!task || typeof task.id_task === 'undefined') {
        console.warn("TaskItem: L'identifiant de la tâche est undefined.");
        return null;
    }

    const isChecked = task.status_task === 'terminé';

    const taskClasses = classNames(
        'flex items-center p-2 rounded m-4',
        {
            'bg-indigo-400': !isChecked,
            'bg-green-400': isChecked,
        }
    );

    return (
        <div className={taskClasses}>
            <div className="flex items-start items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                    className="h-2.5 w-2.5 text-white bg-white rounded-full border-gray-300 cursor-pointer"
                    style={{
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        minWidth: '0.7rem',
                        minHeight: '0.7rem',
                    }}
                />
                <span className={`ml-4 text-xs ${isChecked ? 'line-through' : 'text-white'} leading-tight`}>
                    {task.name_task}
                </span>
            </div>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.shape({
        id_task: PropTypes.number.isRequired,
        name_task: PropTypes.string.isRequired,
        status_task: PropTypes.string.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TaskItem;








