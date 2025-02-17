import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from "../atoms/Container";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Modal from '../templates/Modal';
import Icon from '../atoms/Icon';
import CalendarDrag from '../organisms/CalendarDrag';
import EditForm from '../organisms/EditForm';
import { IoMdClose, IoMdCreate, IoIosAddCircle } from "react-icons/io";
import getApiUrl from '../services/Api';

const UpdateGoal = () => {
    const { goalId } = useParams();
    const token = localStorage.getItem('token');
    const [goal, setGoal] = useState(null);
    const [subGoals, setSubGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [newSubGoal, setNewSubGoal] = useState('');
    const [newTask, setNewTask] = useState({});
    const [showSubGoalForm, setShowSubGoalForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(null);

    const fetchGoalData = async () => {
        try {
            const goalResponse = await axios.get(getApiUrl(`/mygoals/${goalId}`), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const subGoalsResponse = await axios.get(getApiUrl(`/mygoals/${goalId}/subgoals`), {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setGoal(goalResponse.data);
            setSubGoals(subGoalsResponse.data);

            const tasksPromises = subGoalsResponse.data.map(subGoal =>
                axios.get(getApiUrl(`/mygoals/${goalId}/subgoals/${subGoal.id_subgoal}/tasks`), {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            );

            const tasksResponses = await Promise.all(tasksPromises);
            setTasks(tasksResponses.flatMap(response => response.data));
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'objectif:', error);
        }
    };

    useEffect(() => {
        fetchGoalData();
    }, [goalId, token]);

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
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${task.id_subgoal}/tasks/${id}`);
            }
            await axios.delete(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchGoalData();
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
            } else if (currentEdit.type === 'subgoal') {
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${updatedItem.id_subgoal}`);
                await axios.put(url, { name_subgoal: updatedItem.name_subgoal }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else if (currentEdit.type === 'task') {
                const task = tasks.find(task => task.id_task === updatedItem.id_task);
                url = getApiUrl(`/mygoals/${goalId}/subgoals/${task.id_subgoal}/tasks/${updatedItem.id_task}`);
                await axios.put(url, { name_task: updatedItem.name_task }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
            setShowEditModal(false);
            fetchGoalData();
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    const handleAddSubGoal = async () => {
        if (newSubGoal.trim() === '') return;
        try {
            await axios.post (getApiUrl(`/mygoals/${goalId}/subgoals`), {
                name_subgoal: newSubGoal,
                start_date_subgoal: new Date().toISOString(),
                end_date_subgoal: new Date().toISOString()
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNewSubGoal('');
            setShowSubGoalForm(false);
            fetchGoalData();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du sous-objectif:', error);
        }
    };

    const handleAddTask = async (subGoalId) => {
        if (!newTask[subGoalId] || newTask[subGoalId].trim() === '') return;
        try {
            await axios.post(getApiUrl(`/mygoals/${goalId}/subgoals/${subGoalId}/tasks`), {
                name_task: newTask[subGoalId],
                start_date_task: new Date().toISOString(),
                end_date_task: new Date().toISOString()
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNewTask({ ...newTask, [subGoalId]: '' });
            setShowTaskForm(null);
            fetchGoalData();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
        }
    };

    return (
        <>
            <Container className="w-full p-1 md:p-8 border-none md:border-solid mt-4">
                <h3>Structurez votre objectif</h3>
                <p className="text-zinc-700 text-xs">
                    Modifier l'objectif et ses sous-objectifs pour mieux structurer votre progression.
                    Ensuite, ajoutez ou modifiez les tâches associées.
                </p>

                {goal && (
                    <div className="mt-8 border rounded-xl border-secondary p-4">
                        <div className="relative w-full border-b pb-4 border-secondary text-center justify-between flex items-center">
                            <h4>{goal.name_goal}</h4>
                            <button onClick={() => handleEditClick(goal, 'goal')}>
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
                                    value={newSubGoal}
                                    onChange={(e) => setNewSubGoal(e.target.value)}
                                />
                                <div className="flex justify-center">
                                    <Button onClick={handleAddSubGoal}>Ajouter un sous-objectif</Button>
                                </div>
                            </Container>
                        </Modal>

                        {subGoals.length > 0 && (
                            <div className="mt-8">
                                <ul className="flex flex-wrap gap-1">
                                    {subGoals.map((subGoal) => (
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
                                                onClick={() => setShowTaskForm(subGoal.id_subgoal)}
                                            >
                                                <div className="mb-2">
                                                    <span style={{ color: 'white', fontSize: '20px' }}>
                                                        <IoIosAddCircle />
                                                    </span>
                                                </div>
                                                Add Task
                                            </button>

                                            <ul>
                                                {tasks.filter(task => task.id_subgoal === subGoal.id_subgoal).map((task) => (
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
                        goals={goal ? [{ id_goal: goalId, name_goal: goal.name_goal, start_date_goal: goal.start_date_goal, end_date_goal: goal.end_date_goal }] : []}
                        setGoals={(updatedGoals) => {
                            console.log('Updated Goals:', updatedGoals);
                            fetchGoalData();
                        }}
                        id_goal={goalId}
                    />
                </div>
            </Container>

            <Modal show={showTaskForm !== null} onClose={() => setShowTaskForm(null)}>
                {showTaskForm && (
                    <Container className="w-full bg-tertiary border-none p-4">
                        <h5 className="mb-4">Ajouter une tâche</h5>
                        <Input
                            type="text"
                            className="w-full text-white bg-tertiary border-secondary mb-4 p-2 border rounded"
                            text="Nom de votre tâche"
                            value={newTask[showTaskForm] || ''}
                            onChange={(e) => setNewTask({ ...newTask, [showTaskForm]: e.target.value })}
                        />
                        <div className="flex justify-center">
                            <Button onClick={() => handleAddTask(showTaskForm)}>Ajouter une tâche</Button>
                        </div>
                    </Container>
                )}
            </Modal>

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

export default UpdateGoal;









