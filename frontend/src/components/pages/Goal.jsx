import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from "../atoms/Button";
import Modal from "../templates/Modal";
import DeleteGoal from "../organisms/DeleteGoal";
import Select from "../atoms/Select";
import ProgressBar from "../atoms/ProgressBar";
import CardSubGoal from "../molecules/CardSubGoal";
import getApiUrl from "../services/Api"; // Importer la fonction pour générer les URL dynamiquement

const Goal = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { goalId } = useParams();
    const numericGoalId = Number(goalId);
    const [goal, setGoal] = useState(null);
    const [subGoals, setSubGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('optionDefault');
    const [incompleteWarning, setIncompleteWarning] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update-goal/${goalId}`);
    };

    const handleDeleteGoal = () => {
        navigate('/mygoals');
    };

    // Charger les données de l'objectif lors de la première montée en charge
    useEffect(() => {
        fetchGoalData();
    }, [numericGoalId, token]);

    // Fonction pour récupérer les données de l'objectif, sous-objectifs et tâches
    const fetchGoalData = async () => {
        try {
            const goalResponse = await axios.get(getApiUrl(`/mygoals/${numericGoalId}`), {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const subGoalsResponse = await axios.get (getApiUrl(`/mygoals/${numericGoalId}/subgoals`), {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const goalData = goalResponse.data;
            const subGoalsData = subGoalsResponse.data;

            setGoal(goalData);
            setSubGoals(subGoalsData);

            // Récupération des tâches pour chaque sous-objectif
            const tasksPromises = subGoalsData.map(subGoal =>
                axios.get (getApiUrl(`/mygoals/${numericGoalId}/subgoals/${subGoal.id_subgoal}/tasks`), {
                    headers: { 'Authorization': `Bearer ${token}` },
                })
            );

            const tasksResponses = await Promise.all(tasksPromises);
            const allTasks = tasksResponses.flatMap(response => response.data);
            setTasks(allTasks);

            // Calculer la progression de l'objectif
            calculateAndSetGoalProgress(subGoalsData);

            // Vérifier si l'objectif ou les sous-objectifs sont incomplets
            checkForIncompleteGoal(subGoalsData, allTasks);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'objectif:', error);
        }
    };

    // Calcul de la progression de l'objectif en fonction des sous-objectifs
    const calculateAndSetGoalProgress = async (subGoalsData) => {
        if (subGoalsData.length === 0) return;

        const completedSubGoals = subGoalsData.filter(subGoal => subGoal.progress_subgoal === 100);
        const newProgress = (completedSubGoals.length / subGoalsData.length) * 100;
        const goalStatus = newProgress === 0 ? 'en attente' : newProgress === 100 ? 'terminé' : 'en cours';

        setGoal(prevGoal => ({
            ...prevGoal,
            progress_goal: newProgress,
            status_goal: goalStatus
        }));

        // Mettre à jour l'objectif côté backend
        try {
            if (goal) {
                await axios.put(
                    getApiUrl(`/mygoals/${numericGoalId}`),
                    { progress_goal: newProgress, status_goal: goalStatus },
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la progression de l\'objectif:', error);
        }
    };

    // Vérifier si l'objectif ou les sous-objectifs sont incomplets
    const checkForIncompleteGoal = (subGoalsData, allTasks) => {
        if (subGoalsData.length === 0) {
            setIncompleteWarning("Attention: Votre objectif n'a pas de sous-objectifs. Veuillez modifier votre objectif.");
        } else if (allTasks.length === 0) {
            setIncompleteWarning("Attention: Vos sous-objectifs n'ont pas de tâches. Veuillez modifier votre sous-objectif.");
        } else {
            setIncompleteWarning('');
        }
    };

    // Options de filtrage des sous-objectifs
    const options = [
        { value: 'optionDefault', label: 'Filter by status' },
        { value: 'en attente', label: 'En attente' },
        { value: 'en cours', label: 'En cours' },
        { value: 'terminé', label: 'Terminé' },
    ];

    // Filtrer les sous-objectifs selon le filtre sélectionné
    const filteredSubGoals = subGoals.filter(sg => filter === 'optionDefault' || sg.status_subgoal === filter);

    return (
        <>
            {goal && (
                <div className="md:flex justify-between">
                    <h3>{goal.name_goal}</h3>
                    <div className='mt-2 md:mt-0'>
                        <Select
                            options={options}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <Button onClick={handleUpdateClick} className="mr-2 mt-2 md:mt-0 w-full">Modifier</Button>
                        <Button className="bg-red-400 w-full mt-2 md:mt-0" onClick={() => setShowDeleteModal(true)}>Supprimer</Button>
                    </div>
                </div>
            )}

            {/* Affichage de l'alerte si l'objectif est incomplet */}
            {incompleteWarning && (
                <div className="bg-red-500 px-4 py-2 rounded-md my-4">
                    {incompleteWarning}
                </div>
            )}

            {goal && (
                <div className=''>
                    <div className="md:w-1/3 w-full mt-6">
                        <ProgressBar progress={goal.progress_goal || 0} max={100} className="mb-4 w-full" />
                    </div>
    
                    <div className="mt-6">
                        <p className="text-sm text-left">Date de départ : {new Date(goal.start_date_goal).toLocaleDateString()}</p>
                        <p className="text-sm mb-9 text-left">Date de fin : {new Date(goal.end_date_goal).toLocaleDateString()}</p>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {filteredSubGoals.map((subGoal) => (
                            <CardSubGoal
                                key={subGoal.id_subgoal}
                                id={subGoal.id_subgoal}
                                title={subGoal.name_subgoal}
                                progress={subGoal.progress_subgoal || 0}
                                startDate={subGoal.start_date_subgoal}
                                endDate={subGoal.end_date_subgoal}
                                tasks={tasks.filter(task => task.id_subgoal === subGoal.id_subgoal)}
                                id_goal={numericGoalId}
                                onProgressUpdate={fetchGoalData}  // Rafraîchir les données de l'objectif
                            />
                        ))}
                    </div>
                </div>
            )}
            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <DeleteGoal goalId={numericGoalId} onDelete={handleDeleteGoal} />
            </Modal>
        </>
    );
};

export default Goal;
