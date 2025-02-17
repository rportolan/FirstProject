import { useState, useEffect } from 'react';
import ProgressBar from "../atoms/ProgressBar";
import Tag from "../atoms/Tag";
import Container from "../atoms/Container";
import PropTypes from 'prop-types';
import TaskItem from "../molecules/TaskItem";
import axios from 'axios';
import getApiUrl from '../services/Api';

const CardSubGoal = ({ id, title, progress, startDate, endDate, tasks, id_goal }) => {
    const [taskState, setTaskState] = useState(tasks);
    const [currentProgress, setCurrentProgress] = useState(progress);
    const token = localStorage.getItem('token');

    useEffect(() => {
        setTaskState(tasks);
        calculateAndSetProgress(tasks);
    }, [tasks]);

    const calculateAndSetProgress = (tasks) => {
        const completedTasks = tasks.filter(task => task.status_task === 'terminé').length;
        const newProgress = (completedTasks / tasks.length) * 100;
        setCurrentProgress(newProgress);
        return newProgress;
    };

    const handleTaskChange = async (id_task) => {
        const updatedTasks = taskState.map(task => 
            task.id_task === id_task
                ? { ...task, status_task: task.status_task === 'terminé' ? 'en cours' : 'terminé' }
                : task
        );
    
        setTaskState(updatedTasks);
    
        const taskToUpdate = updatedTasks.find(task => task.id_task === id_task);
    
        if (taskToUpdate) {
            try {
                const response = await axios.put(
                    getApiUrl(`/mygoals/${id_goal}/subgoals/${id}/tasks/${id_task}`),
                    { status_task: taskToUpdate.status_task },
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                console.log('Task update response:', response.data);
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la tâche:", error);
                return;
            }
        }
    
        const newProgress = calculateAndSetProgress(updatedTasks);
        const newStatus = newProgress === 0 ? 'en attente' : newProgress === 100 ? 'terminé' : 'en cours';
    
        try {
            const response = await axios.put(
                getApiUrl(`/mygoals/${id_goal}/subgoals/${id}`),
                { progress_subgoal: newProgress, status_subgoal: newStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            console.log('Subgoal update response:', response.data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la progression du sous-objectif:", error);
        }
    
        updateGoalProgress(id_goal);
    };

    const updateGoalProgress = async (id_goal) => {
        try {
            const response = await axios.get (getApiUrl(`/mygoals/${id_goal}/subgoals`), {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const subGoals = response.data;
            const totalSubGoals = subGoals.length;
            const completedSubGoals = subGoals.filter(sg => sg.progress_subgoal === 100).length;
            const goalProgress = (completedSubGoals / totalSubGoals) * 100;
            const goalStatus = goalProgress === 0 ? 'en attente' : goalProgress === 100 ? 'terminé' : 'en cours';

            const updateResponse = await axios.put(
                getApiUrl(`/mygoals/${id_goal}`),
                { progress_goal: goalProgress, status_goal: goalStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            console.log('Goal update response:', updateResponse.data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la progression de l'objectif:", error);
        }
    };

    return (
        <Container className="p-4">
    <div className="mt-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm whitespace-nowrap mb-2 md:mb-0">
                {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </p>
            <h4 className="w-full md:w-48 text-center text-xs sm:text-sm mb-2 md:mb-0">{title}</h4>
            <div className="flex-shrink-0">
                <Tag progress={currentProgress} />
            </div>
        </div>
        <div className="flex justify-center mt-4">
            <ProgressBar progress={currentProgress} max={100} className="mb-4 w-full" />
        </div>
        <h4 className="text-xs sm:text-sm mt-8">Tasks</h4>
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <p className="text-xs sm:text-sm mt-4 ml-4">En cours</p>
                {taskState.filter(task => task.status_task !== 'terminé').map(task => (
                    <TaskItem
                        key={task.id_task}
                        task={task}
                        onChange={() => handleTaskChange(task.id_task)}
                    />
                ))}
            </div>
            <div className="w-full md:w-1/2">
                <p className="text-xs sm:text-sm mt-4 ml-4">Terminé</p>
                {taskState.filter(task => task.status_task === 'terminé').map(task => (
                    <TaskItem
                        key={task.id_task}
                        task={task}
                        onChange={() => handleTaskChange(task.id_task)}
                    />
                ))}
            </div>
        </div>
    </div>
</Container>

    );
};

CardSubGoal.propTypes = {
    id: PropTypes.number.isRequired,
    id_goal: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id_task: PropTypes.number.isRequired,
            name_task: PropTypes.string.isRequired,
            status_task: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default CardSubGoal;