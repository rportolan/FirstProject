import { useState } from 'react';
import Container from "../atoms/Container";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import CalendarDrag from '../organisms/CalendarDrag';
import Modal from '../templates/Modal';
import EditForm from '../organisms/EditForm';
import { IoMdClose, IoMdCreate, IoIosAddCircle } from 'react-icons/io';
import axios from 'axios';
import getApiUrl from "../services/Api"; // Importer la fonction pour générer les URL dynamiquement

const NewGoal = () => {
    const token = localStorage.getItem('token');
    const [goal, setGoal] = useState('');
    const [goalId, setGoalId] = useState(null);
    const [goals, setGoals] = useState([]);
    const [subGoals, setSubGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [goalInput, setGoalInput] = useState('');
    const [subGoalInput, setSubGoalInput] = useState('');
    const [taskInputs, setTaskInputs] = useState({});
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [showSubGoalForm, setShowSubGoalForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);

    const handleEditClick = (item, type) => {
        setCurrentEdit({ item, type });
        setShowEditModal(true);
    };

    const handleDelete = async (id, type) => {
        try {
            let url;
    
            if (type === 'goal') {
                url = getApiUrl(`/mygoals/${id}`);
            } else if (type === 'subgoal') {
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${id}`);
            } else if (type === 'task') {
                const task = tasks.find(task => task.id_task === id);
    
                if (!task) {
                    console.error(`Task with ID ${id} not found!`);
                    return; 
                }
    
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${task.id_subgoal}/tasks/${id}`);
            }
    
            await axios.delete(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            if (type === 'goal') {
                setGoals([]);
                setGoal('');
                setGoalId(null);
                setSubGoals([]);
                setTasks([]);
            } else if (type === 'subgoal') {
                setSubGoals(prevSubGoals => prevSubGoals.filter(sg => sg.id_subgoal !== id));
                setTasks(prevTasks => prevTasks.filter(task => task.id_subgoal !== id));
            } else if (type === 'task') {
                setTasks(prevTasks => prevTasks.filter(task => task.id_task !== id));
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };
    
    const handleEditSubmit = async (updatedItem) => {
        try {
            let url;
            if (currentEdit.type === 'goal') {
                url = getApiUrl(`/mygoals/${updatedItem.id_goal}`);
                await axios.put(url, { name_goal: updatedItem.name_goal }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setGoal(updatedItem.name_goal);
            } else if (currentEdit.type === 'subgoal') {
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${updatedItem.id_subgoal}`);
                await axios.put(url, { name_subgoal: updatedItem.name_subgoal }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setSubGoals(prev => prev.map(sg => sg.id_subgoal === updatedItem.id_subgoal ? updatedItem : sg));
            } else if (currentEdit.type === 'task') {
                const task = tasks.find(task => task.id_task === updatedItem.id_task);
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${task.id_subgoal}/tasks/${updatedItem.id_task}`);
                await axios.put(url, { name_task: updatedItem.name_task }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setTasks(prev => prev.map(t => t.id_task === updatedItem.id_task ? updatedItem : t));
            }
            setShowEditModal(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    const handleAddGoal = async () => {
        try {
            const response = await axios.post(getApiUrl('/mygoals'), {
                name_goal: goalInput,
                start_date_goal: new Date().toISOString().split('T')[0],
                end_date_goal: new Date().toISOString().split('T')[0]
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const newGoal = response.data;
            setGoals([newGoal]);
            setGoal(newGoal.name_goal);
            setGoalId(newGoal.id_goal);
            setGoalInput('');
            setSubGoals([]);
            setTasks([]);
            setShowGoalForm(false);
        } catch (error) {
            console.error('Erreur lors de la création de l\'objectif:', error);
        }
    };

    const handleAddSubGoal = async () => {
        if (!goalId) {
            alert("Veuillez d'abord créer un objectif avant d'ajouter des sous-objectifs.");
            return;
        }

        try {
            const response = await axios.post(getApiUrl(`/mygoals/${goalId}/subgoals`), {
                name_subgoal: subGoalInput,
                start_date_subgoal: new Date().toISOString().split('T')[0],
                end_date_subgoal: new Date().toISOString().split('T')[0]
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const newSubGoal = response.data;
            setSubGoals([...subGoals, { ...newSubGoal, tasks: [] }]);
            setSubGoalInput('');
            setShowSubGoalForm(false);
        } catch (error) {
            console.error('Erreur lors de la création du sous-objectif:', error);
        }
    };

    const handleTaskInputChange = (index, value) => {
        setTaskInputs({ ...taskInputs, [index]: value });
    };

    const handleAddTask = async (index) => {
        const subGoalId = subGoals[index].id_subgoal;
        if (!subGoalId) {
            alert("Veuillez d'abord créer un sous-objectif avant d'ajouter des tâches.");
            return;
        }
    
        try {
            const response = await axios.post(getApiUrl(`/mygoals/${goalId}/subgoals/${subGoalId}/tasks`), {
                name_task: taskInputs[index],
                start_date_task: new Date().toISOString().split('T')[0],
                end_date_task: new Date().toISOString().split('T')[0]
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            const newTask = response.data;
            
            setTasks(prevTasks => [...prevTasks, { ...newTask, id_subgoal: subGoalId }]);
    
            setSubGoals(prevSubGoals => {
                return prevSubGoals.map(sg => {
                    if (sg.id_subgoal === subGoalId) {
                        return {
                            ...sg,
                            tasks: [...sg.tasks, newTask]
                        };
                    }
                    return sg;
                });
            });
    
            setTaskInputs({ ...taskInputs, [index]: '' });
            setShowTaskForm(null);
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
        }
    };
    

    return (
        <>
            <Container className="w-full p-1 md:p-8 border-none md:border-solid mt-4">
                <h3>Structurez votre objectif</h3>
                <p className="text-zinc-700 text-xs">
                    Ajoutez un objectif puis des sous-objectifs pour mieux structurer votre progression.
                    Ensuite, ajoutez les tâches que vous devrez réaliser pour avancer dans votre objectif.
                </p>
                
                <div className="flex justify-center">
                    <button
                        className="mt-8 mx-auto p-4 w-28 h-24 border bg-tertiary border-secondary rounded-2xl text-xs flex flex-col items-center justify-center"
                        onClick={() => setShowGoalForm(true)}
                    >
                        <div className="mb-2">
                            <span style={{ color: 'white', fontSize: '20px' }}>
                                <IoIosAddCircle />
                            </span>
                        </div>
                        Add Goal
                    </button>
                </div>

                {goal && (
                    <div className="mt-8 border rounded-xl border-secondary p-4">
                        <div className="relative w-full border-b pb-4 border-secondary text-center justify-between flex items-center">
                            <h4>{goal}</h4>
                            <button onClick={() => handleEditClick({ id_goal: goalId, name_goal: goal }, 'goal')}>
                                <IoMdCreate size={20} />
                            </button>
                        </div>

                        <button
                            className="mt-8 mx-auto p-4 w-22 h-24 border bg-tertiary border-secondary rounded-2xl text-xs flex flex-col items-center justify-center"
                            onClick={() => setShowSubGoalForm(true)}
                        >
                            <div className="mb-2">
                                <span style={{ color: 'white', fontSize: '20px' }}>
                                    <IoIosAddCircle />
                                </span>
                            </div>
                            Add SubGoals
                        </button>

                        <Modal show={showSubGoalForm} onClose={() => setShowSubGoalForm(false)}>
                            <Container className="w-full bg-tertiary border-none p-4">
                                <h5 className="mb-4">Ajouter un sous-objectif</h5>
                                <Input
                                    type="text"
                                    className="w-full text-white bg-tertiary border-secondary mb-4 p-2 border rounded"
                                    text="Nom de votre sous-objectif"
                                    value={subGoalInput}
                                    onChange={(e) => setSubGoalInput(e.target.value)}
                                />
                                <div className="flex justify-center">
                                    <Button onClick={handleAddSubGoal}>Ajouter un sous-objectif</Button>
                                </div>
                            </Container>
                        </Modal>

                        {subGoals.length > 0 && (
                            <div className="mt-8">
                                <ul className="flex flex-wrap gap-1">
                                    {subGoals.map((subGoal, index) => (
                                        <li className="relative bg-tertiary border border-secondary rounded p-5 mt-2 w-full" key={subGoal.id_subgoal}>
                                            <div className="flex justify-between items-center mb-4 border-b pb-4 border-secondary">
                                                <h4 className="text-sm">{subGoal.name_subgoal}</h4>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleDelete(subGoal.id_subgoal, 'subgoal')}>
                                                        <IoMdClose size={20} />
                                                    </button>
                                                    <button onClick={() => handleEditClick(subGoal, 'subgoal')}>
                                                        <IoMdCreate size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="mt-4 mb-8 mx-auto p-4 w-28 h-24 border bg-tertiary border-secondary rounded-2xl text-xs flex flex-col items-center justify-center"
                                                onClick={() => setShowTaskForm(index)}
                                            >
                                                <div className="mb-2">
                                                    <span style={{ color: 'white', fontSize: '20px' }}>
                                                        <IoIosAddCircle />
                                                    </span>
                                                </div>
                                                Add Task
                                            </button>

                                            <ul>
                                                {tasks.filter(task => task.id_subgoal === subGoal.id_subgoal).map((task, taskIndex) => (
                                                <li className="relative bg-black flex items-center text-sm h-14 border border-secondary mb-2 py-2 pl-2 pr-12 rounded" key={task.id_task}>
                                                    <button className="absolute top-1.5 right-2" onClick={() => handleDelete(task.id_task, 'task')}>
                                                        <IoMdClose size={20} />
                                                    </button>
                                                    <p>{task.name_task}</p>
                                                </li>
                                                 ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </Container>

            <Container className="w-full p-1 md:p-8 border-none md:border-solid mt-8">
                <h3>Programmer votre objectif</h3>
                <p className="text-zinc-700 text-xs">Fixez une date pour vos éléments</p>
                <div className="mt-6">
                    <CalendarDrag
                        tasks={tasks}
                        setTasks={setTasks}
                        subGoals={subGoals}
                        setSubGoals={setSubGoals}
                        goals={goals}
                        setGoals={setGoals}
                        id_goal={goalId}
                    />
                </div>
            </Container>

            <Modal show={showGoalForm} onClose={() => setShowGoalForm(false)}>
                <Container className="w-full bg-tertiary border-none p-4">
                    <h5 className="mb-4">Ajouter un objectif</h5>
                    <Input
                        type="text"
                        className="w-full text-white bg-tertiary border-secondary mb-4 p-2 border rounded"
                        text="Nom de votre objectif"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                    />
                    <div className="flex justify-center">
                        <Button onClick={handleAddGoal}>Ajouter un objectif</Button>
                    </div>
                </Container>
            </Modal>

            {showTaskForm !== null && (
                <Modal show={showTaskForm !== null} onClose={() => setShowTaskForm(null)}>
                    <Container className="w-full bg-tertiary border-none p-4">
                        <h5 className="mb-4">Ajouter une tâche</h5>
                        <Input
                            type="text"
                            className="w-full text-white bg-tertiary border-secondary mb-4 p-2 border rounded"
                            text="Nom de votre tâche"
                            value={taskInputs[showTaskForm] || ''}
                            onChange={(e) => handleTaskInputChange(showTaskForm, e.target.value)}
                        />
                        <div className="flex justify-center">
                            <Button onClick={() => handleAddTask(showTaskForm)}>Ajouter une tâche</Button>
                        </div>
                    </Container>
                </Modal>
            )}

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                {currentEdit && (
                    <EditForm
                        item={currentEdit.item}
                        type={currentEdit.type}
                        onSubmit={handleEditSubmit}
                    />
                )}
            </Modal>
        </>
    );
};

export default NewGoal;
