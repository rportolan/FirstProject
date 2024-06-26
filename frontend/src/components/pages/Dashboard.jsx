import Container from "../atoms/Container";
import CardGoal from "../molecules/CardGoal";
import TaskItem from "../molecules/TaskItem";
import CalendarDashboard from "../molecules/CalendarDashboard.jsx";
import Carousel from "../templates/Carousel.jsx";

const Dashboard = () => {
    const tasks = [
      'Learn React',
      'Build a React App',
      'Deploy the App',
      'Apprendre le prétérit présent'
    ];

    const messages = [
      "La productivité s'épanouit avec la motivation. Pour rester motivé,  définissez des objectifs précis et mesurables, et prenez le temps de  reconnaître chaque petit succès. Un environnement bien organisé et des  pauses régulières stimulent également l'efficacité. Restez curieux,  cherchez constamment à apprendre et à vous adapter, car le dynamisme  personnel est le moteur de toute réussite.",

      "La productivité s'épanouit avec la motivation. Pour rester motivé,  définissez des objectifs précis et mesurables, et prenez le temps de  reconnaître chaque petit succès. Un environnement bien organisé et des  pauses régulières stimulent également l'efficacité.",

      "La motivation est la force intérieure qui pousse chacun à atteindre ses objectifs. Elle est essentielle pour surmonter les obstacles et persévérer malgré les difficultés. La motivation peut être intrinsèque, venant de l'intérieur, comme le désir de réussir ou d'apprendre, ou extrinsèque, stimulée par des récompenses externes comme la reconnaissance ou les gains financiers. Cultiver la motivation nécessite des objectifs clairs, une vision inspirante et des petites victoires quotidiennes. En restant concentré sur ses aspirations et en s'entourant de soutien positif, chacun peut maintenir sa motivation et avancer vers ses rêves."

    ];

    return (
      <>
        <h3>Dashboard</h3>
        <div className="min-h-screen mt-4 grid grid-cols-8 grid-rows-8 gap-4">

          <Container className="col-span-3 row-span-2">
            <h4 className="p-3">Nombre de sous-objectifs accomplis</h4>
            <p className="mt-5 text-center text-7xl">48 <span className="text-xl">Sous-objectifs</span></p>
          </Container>

          <Container className="col-span-3 row-span-2">
          <h4 className="p-3">Nombre d'objectifs accomplis</h4>
          <p className="mt-5 text-center text-7xl">4 <span className="text-xl">Objectifs</span></p>
          </Container>

          <Container className="col-span-2 row-span-4">
            <h4 className="p-3">Aujourd'hui</h4>
            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
            ))}
          </Container>

          <Container className="col-span-3 row-span-2">
            <h4 className="p-3">Objectif du moment</h4>
            <div className="mt-2 flex justify-center">
              <CardGoal progress={65}/>
            </div>
          </Container>

          <Container className="col-span-3 row-span-2">
            <h4 className="p-3">Sous-objectif du moment</h4>
            <div className="mt-2 flex justify-center">
              <CardGoal progress={40}/>
            </div>
          </Container>

          <Container className="col-span-3 row-span-4">
            <h4 className="p-3">Vos prochains objectifs</h4>
            <div className=" h-80 mt-2 flex flex-col gap-4 items-center overflow-auto">
              <CardGoal progress={0}/>
              <CardGoal progress={0}/>
              <CardGoal progress={0}/>
              <CardGoal progress={0}/>
              <CardGoal progress={0}/>
              <CardGoal progress={0}/>
            </div>
          </Container>

          <Container className="col-span-3 row-span-4">
            <h4 className="p-3">Calendar</h4>
            <div className="h-80 m-4 flex flex-col items-center overflow-auto">
              <CalendarDashboard date="Lundi 20 Février 2024" />
              <CalendarDashboard date="Mardi 21 Février 2024" />
              <CalendarDashboard date="Mercredi 23 Février 2024" />
              <CalendarDashboard date="Jeudi 24 Février 2024"/>
              <CalendarDashboard date="Vendredi 25 Février 2024"/>
              <CalendarDashboard date="Samedi 26 Février 2024"/>
              <CalendarDashboard date="Dimanche 27 Février 2024"/>
            </div>
          </Container>

          <Container className="col-span-2 row-span-4">
            <h4 className="p-3">Vos dernier messages</h4>
            <Carousel items={messages} />
          </Container>
        </div>
      </>
    )
  }
  
  export default Dashboard;