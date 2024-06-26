import Button from "../atoms/Button";
import ItemBook from "../molecules/ItemBook";
import { useParams } from 'react-router-dom';

const MyBook = () => {
    const { id } = useParams();
    
    const messages = {
        '1': "La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite.",
        '2': "La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite. La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite.",
        '3': "La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite. La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite. La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite.",
        // Ajoutez plus de messages selon vos besoins
    };
    const message = messages[id];
    return (
      <>
        <div className="flex justify-between">
            <h3>Journal de bord</h3>
            <div>
                <Button className={"mr-2"}>Modifier message</Button>
                <Button>Nouveau message</Button>
            </div>
        </div>
        <ItemBook message={message}/>

      </>
    )
  }
  
  export default MyBook;