import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import axios from 'axios';
import getApiUrl from '../services/Api';

const CalendarDrag = ({ tasks, setTasks, subGoals, setSubGoals, goals, setGoals, id_goal }) => {
    const token = localStorage.getItem('token');
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        const draggableEl = document.getElementById('external-tasks');
        if (draggableEl && !draggableEl.getAttribute('data-draggable-initialized')) {
            new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute('title');
                    let type = eventEl.getAttribute('data-type');
                    let id = eventEl.getAttribute('data-id');
                    return { title, id, type };
                }
            });
            draggableEl.setAttribute('data-draggable-initialized', 'true');
        }
    }, []);

    useEffect(() => {
        const newEvents = [
            ...tasks.map(task => ({
                title: task.name_task,
                start: task.start_date_task,
                end: task.end_date_task,
                id: task.id_task,
                type: 'task',
                allDay: true,
                backgroundColor: '#FFDDC1',
                borderColor: '#FFDDC1',
                textColor: '#000',
                extendedProps: {
                    type: 'task'
                }
            })),
            ...subGoals.map(subGoal => ({
                title: subGoal.name_subgoal,
                start: subGoal.start_date_subgoal,
                end: subGoal.end_date_subgoal,
                id: subGoal.id_subgoal,
                type: 'subgoal',
                allDay: true,
                backgroundColor: '#D4E6F1',
                borderColor: '#D4E6F1',
                textColor: '#000',
                extendedProps: {
                    type: 'subgoal'
                }
            })),
            ...goals.map(goal => ({
                title: goal.name_goal,
                start: goal.start_date_goal,
                end: goal.end_date_goal,
                id: goal.id_goal,
                type: 'goal',
                allDay: true,
                backgroundColor: '#C9F7F5',
                borderColor: '#C9F7F5',
                textColor: '#000',
                extendedProps: {
                    type: 'goal'
                }
            })),
        ];
        console.log("Updated Calendar Events:", newEvents);
        setCalendarEvents(newEvents);
    }, [tasks, subGoals, goals]);

    const handleEventChange = async (event) => {
        const { id, extendedProps } = event;
        const { type } = extendedProps;
        const newStartDate = new Date(event.start.getTime() - event.start.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const newEndDate = event.end ? new Date(event.end.getTime() - event.end.getTimezoneOffset() * 60000).toISOString().split('T')[0] : newStartDate;
    
        console.log(`Event Changed: ${type} with ID ${id} to start on ${newStartDate} and end on ${newEndDate}`);
    
        try {
            let updateUrl;
            let payload;
    
            switch (type) {
                case 'task':
                    // Trouver la tâche par son ID
                    const task = tasks.find(task => task.id_task === parseInt(id));
                    if (!task) {
                        console.error(`Task with ID ${id} not found!`);
                        return;
                    }
    
                    // Vérification de la présence du subgoalId
                    const subgoalId = task.id_subgoal;
                    if (!subgoalId) {
                        console.error(`Subgoal ID not found for task with ID ${id}!`);
                        return;
                    }
    
                    // Construire l'URL de mise à jour
                    updateUrl = getApiUrl(`/mygoals/${id_goal}/subgoals/${subgoalId}/tasks/${id}`);
                    payload = { start_date_task: newStartDate, end_date_task: newEndDate };
    
                    // Envoyer la requête PUT
                    await axios.put(updateUrl, payload, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
    
                    // Mettre à jour l'état des tâches
                    setTasks(prevTasks =>
                        prevTasks.map(t =>
                            t.id_task === parseInt(id) ? { ...t, start_date_task: newStartDate, end_date_task: newEndDate } : t
                        )
                    );
                    break;
                
                case 'subgoal':
                    updateUrl = getApiUrl(`/mygoals/${id_goal}/subgoals/${id}`);
                    payload = { start_date_subgoal: newStartDate, end_date_subgoal: newEndDate };
                    await axios.put(updateUrl, payload, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setSubGoals(prevSubGoals =>
                        prevSubGoals.map(sg =>
                            sg.id_subgoal === parseInt(id) ? { ...sg, start_date_subgoal: newStartDate, end_date_subgoal: newEndDate } : sg
                        )
                    );
                    break;
                
                case 'goal':
                    updateUrl = getApiUrl(`/mygoals/${id}`);
                    payload = { start_date_goal: newStartDate, end_date_goal: newEndDate };
                    await axios.put(updateUrl, payload, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setGoals(prevGoals =>
                        prevGoals.map(g =>
                            g.id_goal === parseInt(id) ? { ...g, start_date_goal: newStartDate, end_date_goal: newEndDate } : g
                        )
                    );
                    break;
                
                default:
                    throw new Error('Unknown type');
            }
    
            console.log('Date updated successfully');
        } catch (error) {
            console.error('Erreur lors de la mise à jour des dates:', error);
            alert('Erreur lors de la mise à jour des dates.');
        }
    };
    
    
    
    

    return (
        <div className="flex flex-col md:flex-row">
            <div id="external-tasks" className='w-full md:w-64 border border-secondary p-2 rounded mt-4 md:mt-15'>
                <p className='text-zinc-700 text-xs'>Drag & Drop ton élément et place le dans le calendrier sur la date souhaitée </p>
                <h3 className='mt-8 mb-4 text-center'>Tâches</h3>
                {tasks.map((task, index) => (
                    <div
                        className="fc-event border rounded border-secondary p-1 cursor-pointer m-2 text-sm"
                        title={task.name_task}
                        data-type="task"
                        data-id={task.id_task}
                        key={index}
                    >
                        {task.name_task}
                    </div>
                ))}
    
                <h3 className='mt-4 mb-4 text-center'>Objectifs</h3>
                {goals.map((goal, index) => (
                    <div
                        className="fc-event border rounded border-secondary p-1 cursor-pointer m-2 text-sm"
                        title={goal.name_goal}
                        data-type="goal"
                        data-id={goal.id_goal}
                        key={index}
                    >
                        {goal.name_goal}
                    </div>
                ))}
    
                <h3 className='mt-4 mb-4 text-center'>Sous-objectifs</h3>
                {subGoals.map((subgoal, index) => (
                    <div
                        className="fc-event border rounded border-secondary p-1 cursor-pointer m-2 text-sm"
                        title={subgoal.name_subgoal}
                        data-type="subgoal"
                        data-id={subgoal.id_subgoal}
                        key={index}
                    >
                        {subgoal.name_subgoal}
                    </div>
                ))}
            </div>
            <div className="mt-8 md:mt-0 md:ml-5 w-full">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        start: "prev,next",
                        center: "title",  // Ajouter des classes ici pour contrôler la visibilité
                        end: "dayGridMonth",
                    }}
                    editable={true}
                    height={"100vh"}
                    droppable={true}
                    events={calendarEvents}
                    eventReceive={(info) => {
                        console.log(`Event received: ${info.event.title}`);
                        handleEventChange(info.event);
                    }}
                    eventDrop={(info) => {
                        console.log(`Event dropped: ${info.event.title}`);
                        handleEventChange(info.event);
                    }}
                    eventResize={(info) => {
                        console.log(`Event resized: ${info.event.title}`);
                        handleEventChange(info.event);
                    }}
                />
            </div>
        </div>
    );
    
};

export default CalendarDrag;





































