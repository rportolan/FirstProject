import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../atoms/Container";
import TaskItem from "../molecules/TaskItem";
import CardGoal from "../molecules/CardGoal";
import CalendarDashboard from "../molecules/CalendarDashboard";
import Carousel from "../templates/Carousel";
import { startOfWeek, endOfWeek, format, isToday } from "date-fns";
import { fr } from 'date-fns/locale';
import getApiUrl from "../services/Api"; // Importer la fonction pour générer les URL dynamiquement

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [completedSubGoals, setCompletedSubGoals] = useState(0);
  const [ongoingGoals, setOngoingGoals] = useState([]);
  const [ongoingSubGoals, setOngoingSubGoals] = useState([]);
  const [pendingGoals, setPendingGoals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [weekData, setWeekData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const goalsResponse = await axios.get(getApiUrl("/mygoals"), {
        headers: { Authorization: `Bearer ${token}` },
      });

        const goalsData = goalsResponse.data;
        const completedGoalsCount = goalsData.filter(
            (goal) => goal.status_goal === "terminé"
        ).length;

        let completedSubGoalsCount = 0;
        const ongoingGoalsList = [];
        const ongoingSubGoalsList = [];
        const pendingGoalsList = [];
        const todayTasksList = [];
        const weekTasksList = [];

        const today = new Date();
        const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
        const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

        for (const goal of goalsData) {
            const subGoalsResponse = await axios.get(
              getApiUrl(`/mygoals/${goal.id_goal}/subgoals`),
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const subGoalsData = subGoalsResponse.data;
            completedSubGoalsCount += subGoalsData.filter(
                (subGoal) => subGoal.status_subgoal === "terminé"
            ).length;

            const subGoalsInWeek = subGoalsData.filter(
                (subGoal) =>
                    new Date(subGoal.start_date_subgoal) <= endOfWeekDate &&
                    new Date(subGoal.end_date_subgoal) >= startOfWeekDate
            );

            ongoingSubGoalsList.push(
                ...subGoalsData.filter((subGoal) => subGoal.status_subgoal === "en cours")
            );

            for (const subGoal of subGoalsInWeek) {
                const tasksResponse = await axios.get(
                  getApiUrl(`/mygoals/${goal.id_goal}/subgoals/${subGoal.id_subgoal}/tasks`),
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const tasksData = tasksResponse.data.map((task) => ({
                    ...task,
                    id_goal: goal.id_goal,
                    id_subgoal: subGoal.id_subgoal,
                }));

                // Filtrer les tâches de la semaine et d'aujourd'hui
                tasksData.forEach((task) => {
                    const taskDate = new Date(task.start_date_task);
                    
                    if (isToday(taskDate)) {
                        todayTasksList.push(task);
                    }
                    
                    if (
                        taskDate <= endOfWeekDate &&
                        taskDate >= startOfWeekDate
                    ) {
                        weekTasksList.push({
                            date: format(taskDate, "EEEE dd MMMM yyyy" , {locale: fr}),
                            type: "Tâche",
                            name: task.name_task,
                        });
                    }
                });

                weekTasksList.push({
                    date: format(new Date(subGoal.start_date_subgoal), "EEEE dd MMMM yyyy" , { locale: fr}),
                    type: "Sous-Objectif",
                    name: subGoal.name_subgoal,
                });
            }

            if (
                new Date(goal.start_date_goal) <= endOfWeekDate &&
                new Date(goal.end_date_goal) >= startOfWeekDate
            ) {
                weekTasksList.push({
                    date: format(new Date(goal.start_date_goal), "EEEE dd MMMM yyyy" , { locale: fr}),
                    type: "Objectif",
                    name: goal.name_goal,
                });
            }

            if (goal.status_goal === "en cours") {
                ongoingGoalsList.push(goal);
            } else if (goal.status_goal === "en attente") {
                pendingGoalsList.push(goal);
            }
        }

        setTasks(todayTasksList);
        setCompletedGoals(completedGoalsCount);
        setCompletedSubGoals(completedSubGoalsCount);
        setOngoingGoals(ongoingGoalsList);
        setOngoingSubGoals(ongoingSubGoalsList);
        setPendingGoals(pendingGoalsList);

        const groupedWeekData = weekTasksList.reduce((acc, task) => {
            if (!acc[task.date]) {
                acc[task.date] = [];
            }
            acc[task.date].push(task);
            return acc;
        }, {});

        setWeekData(groupedWeekData);

        const messagesResponse = await axios.get(getApiUrl("/logbook"), {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit: 5, order: "DESC" },
        });

        setMessages(messagesResponse.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
};


  const updateGoalProgress = async (id_goal) => {
    try {
      const subGoalsResponse = await axios.get(
        getApiUrl(`/mygoals/${id_goal}/subgoals`),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const subGoalsData = subGoalsResponse.data;
      const completedSubGoals = subGoalsData.filter(
        (subGoal) => subGoal.progress_subgoal === 100
      ).length;
      const totalSubGoals = subGoalsData.length;
      const goalProgress = (completedSubGoals / totalSubGoals) * 100;
      const goalStatus =
        goalProgress === 0 ? "en attente" : goalProgress === 100 ? "terminé" : "en cours";

      await axios.put(
        getApiUrl(`/mygoals/${id_goal}`),
        { progress_goal: goalProgress, status_goal: goalStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

    } catch (error) {
      console.error("Erreur lors de la mise à jour de la progression de l'objectif:", error);
    }
  };

  const handleTaskChange = async (id_task, currentStatus) => {
    try {
      const newStatus = currentStatus === "terminé" ? "en cours" : "terminé";
      const taskToUpdate = tasks.find((task) => task.id_task === id_task);
  
      await axios.put(
        getApiUrl(`/mygoals/${taskToUpdate.id_goal}/subgoals/${taskToUpdate.id_subgoal}/tasks/${id_task}`),
        { status_task: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id_task === id_task ? { ...task, status_task: newStatus } : task
        )
      );
  
      // Mettre à jour la progression du sous-objectif
      const subGoalTasksResponse = await axios.get(
        getApiUrl(`/mygoals/${taskToUpdate.id_goal}/subgoals/${taskToUpdate.id_subgoal}/tasks`),
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const subGoalTasks = subGoalTasksResponse.data;
      const completedTasks = subGoalTasks.filter(
        (task) => task.status_task === "terminé"
      ).length;
      const subGoalProgress =
        (completedTasks / subGoalTasks.length) * 100;
  
      const newSubGoalStatus =
        subGoalProgress === 0 ? "en attente" : subGoalProgress === 100 ? "terminé" : "en cours";
  
      await axios.put(
        getApiUrl(`/mygoals/${taskToUpdate.id_goal}/subgoals/${taskToUpdate.id_subgoal}`),
        { progress_subgoal: subGoalProgress, status_subgoal: newSubGoalStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Mettre à jour la progression de l'objectif
      updateGoalProgress(taskToUpdate.id_goal);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };
  

  const ongoingTasks = tasks.filter(task => task.status_task !== "terminé");
  const completedTasks = tasks.filter(task => task.status_task === "terminé");

  return (
    <>
      <h3>Dashboard</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-8 md:grid-rows-8">
        <Container className="col-span-1 row-span-1 md:col-span-3 md:row-span-2">
          <h4 className="p-3">Nombre de sous-objectifs accomplis</h4>
          <p className="mt-5 mb-10 text-center text-7xl">
            {completedSubGoals} <span className="text-xl">Sous-objectifs</span>
          </p>
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-3 md:row-span-2">
          <h4 className="p-3">Nombre d'objectifs accomplis</h4>
          <p className="mt-5 mb-10 text-center text-7xl">
            {completedGoals} <span className="text-xl">Objectifs</span>
          </p>
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-2 md:row-span-4">
          <h4 className="p-3">Aujourd'hui</h4>
          <div className="max-h-72 overflow-y-auto">
            <h5 className="mt-4 ml-2 text-sm">En cours</h5>
            {ongoingTasks.map((task) => (
              <TaskItem
                key={task.id_task}
                task={task}
                onChange={() => handleTaskChange(task.id_task, task.status_task)}
              />
            ))}
            <h5 className="mt-4 ml-2 text-sm">Terminé</h5>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id_task}
                task={task}
                onChange={() => handleTaskChange(task.id_task, task.status_task)}
              />
            ))}
          </div>
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-3 md:row-span-2">
          <h4 className="p-3">Objectifs en cours</h4>
          <div className="mt-2 mx-14 mb-10 flex gap-4 overflow-x-auto">
            {ongoingGoals.map((goal) => (
              <CardGoal
                key={goal.id_goal}
                id={goal.id_goal}
                title={goal.name_goal}
                progress={goal.progress_goal}
              />
            ))}
          </div>
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-3 md:row-span-2">
          <h4 className="p-3">Sous-objectifs en cours</h4>
          <div className="mt-2 mx-14 mb-10 flex gap-4 overflow-x-auto">
            {ongoingSubGoals.map((subGoal) => (
              <CardGoal
                key={subGoal.id_subgoal}
                id={subGoal.id_subgoal}
                title={subGoal.name_subgoal}
                progress={subGoal.progress_subgoal}
                isSubGoal={true} 
              />
            ))}
          </div>
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-3 md:row-span-2">
          <h4 className="p-3">Objectifs en attente</h4>
          <div className="mt-2 mx-14 mb-10 flex gap-4 overflow-x-auto">
            {pendingGoals.map((goal) => (
              <CardGoal
                key={goal.id_goal}
                id={goal.id_goal}
                title={goal.name_goal}
                progress={goal.progress_goal}
              />
            ))}
          </div>
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-3 md:row-span-4">
          <h4 className="p-3">Vos derniers messages</h4>
          <Carousel 
            items={messages.map((msg) => ({
            title: msg.title_message,
            message: msg.content_message,
            tag: msg.tag_message,
            }))}
          />
        </Container>
  
        <Container className="col-span-1 row-span-1 md:col-span-2 md:row-span-4">
          <h4 className="p-3">Calendrier</h4>
          <div className="h-80 m-4 flex flex-col items-center overflow-auto">
            {Object.keys(weekData).map((date) => (
              <CalendarDashboard key={date} date={date} items={weekData[date]} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
  
};

export default Dashboard;















