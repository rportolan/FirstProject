import SearchBar from "../atoms/SearchBar";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import CardGoal from "../molecules/CardGoal";
const MyGoals = () => {
    return (
      <>
        <div className="flex justify-between">
            <h3>Mes objectifs</h3>
            <SearchBar placeholder="Search for items..." />
            <div>
                <Select />
                <Button>Nouvelle objectif</Button>
            </div>
        </div>
        <div className="mt-12 flex flex-wrap">
            <div className="flex flex-wrap gap-4 justify-between">
                <CardGoal progress={100}/>
                <CardGoal progress={100}/>
                <CardGoal progress={100}/>
                <CardGoal progress={100}/>
                <CardGoal progress={70}/>
                <CardGoal progress={30}/>
                <CardGoal progress={28}/>
                <CardGoal progress={0}/>
                <CardGoal progress={0}/>
            </div>
            
        </div>
      </>
    )
  }
  
  export default MyGoals;