import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import getApiUrl from '../services/Api';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les objectifs
                const goalsResponse = await axios.get (getApiUrl('/mygoals'), {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const goals = goalsResponse.data;

                // Pour chaque objectif, récupérer les sous-objectifs et les tâches
                const subGoalsPromises = goals.map(goal =>
                    axios.get (getApiUrl(`/mygoals/${goal.id_goal}/subgoals`), {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                );

                const subGoalsResponses = await Promise.all(subGoalsPromises);
                const subGoals = subGoalsResponses.flatMap(response => response.data);

                const tasksPromises = subGoals.map(subGoal =>
                    axios.get (getApiUrl(`/mygoals/${subGoal.id_goal}/subgoals/${subGoal.id_subgoal}/tasks`), {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                );

                const tasksResponses = await Promise.all(tasksPromises);
                const tasks = tasksResponses.flatMap(response => response.data);

                // Convertir les objectifs, sous-objectifs et tâches en événements
                const allEvents = [
                    ...goals.map(goal => ({
                        title: goal.name_goal,
                        start: goal.start_date_goal,
                        end: goal.end_date_goal,
                        allDay: true,
                        backgroundColor: '#C9F7F5',
                        borderColor: '#C9F7F5',
                        textColor: '#000',
                        extendedProps: {
                            type: 'goal',
                            id: goal.id_goal
                        }
                    })),
                    ...subGoals.map(subGoal => ({
                        title: subGoal.name_subgoal,
                        start: subGoal.start_date_subgoal,
                        end: subGoal.end_date_subgoal,
                        allDay: true,
                        backgroundColor: '#D4E6F1',
                        borderColor: '#D4E6F1',
                        textColor: '#000',
                        extendedProps: {
                            type: 'subgoal',
                            id: subGoal.id_subgoal
                        }
                    })),
                    ...tasks.map(task => ({
                        title: task.name_task,
                        start: task.start_date_task,
                        end: task.end_date_task,
                        allDay: true,
                        backgroundColor: '#FFDDC1',
                        borderColor: '#FFDDC1',
                        textColor: '#000',
                        extendedProps: {
                            type: 'task',
                            id: task.id_task
                        }
                    }))
                ];

                setEvents(allEvents);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className='min-h-screen'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "prev,next",
                    center: "title",
                    end: "dayGridMonth",
                }}
                events={events}
                height={"100vh"}
            />
        </div>
    );
};

export default Calendar;

