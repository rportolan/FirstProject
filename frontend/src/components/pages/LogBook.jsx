import SearchBar from "../atoms/SearchBar";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import ItemBook from "../molecules/ItemBook";

const LogBook = () => {

    return (
      <>
        <div className="flex justify-between">
            <h3>Journal de bord</h3>
            <SearchBar placeholder="Search for items..." />
            <div>
                <Select />
                <Button>Nouveau message</Button>
            </div>
        </div>
        <div className="mt-12 flex flex-wrap">
            <div className="flex flex-wrap justify-between">
              <div className="w-1/3">
              <ItemBook id="1" message="La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite." />
              </div>
              <div className="w-1/3">
              <ItemBook id="2" message="La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite. La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite."/>
              </div>
              <div className="w-1/3">
              <ItemBook id="3" message="La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite. La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite. La productivité s'épanouit avec la motivation. Pour rester motivé, définissez des objectifs précis et mesurables, et prenez le temps de reconnaître chaque petit succès. Un environnement bien organisé et des pauses régulières stimulent également l'efficacité. Restez curieux, cherchez constamment à apprendre et à vous adapter, car le dynamisme personnel est le moteur de toute réussite."/>
              </div> 
            </div>
            
        </div>
      </>
    )
  }
  
  export default LogBook;