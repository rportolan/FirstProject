import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

const EditForm = ({ item, type, onSubmit }) => {
    const [name, setName] = useState(type === 'goal' ? item.name_goal : type === 'subgoal' ? item.name_subgoal : item.name_task);

    const handleSubmit = () => {
        const updatedItem = { ...item, [type === 'goal' ? 'name_goal' : type === 'subgoal' ? 'name_subgoal' : 'name_task']: name };
        onSubmit(updatedItem);
    };

    return (
        <div className='mt-6 w-ful'>
            <h2 className='mb-4'>Modifier {type === 'goal' ? "l'objectif" : type === 'subgoal' ? "le sous-objectif" : "la tâche"}</h2>
            <input
                type="text"
                className="w-full bg-tertiary border-secondary mb-4 p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className='flex w-full justify-center mt-4'>
                <Button onClick={handleSubmit}>Enregistrer</Button>
            </div>
        </div>
    );
};

EditForm.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['goal', 'subgoal', 'task']).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default EditForm;
