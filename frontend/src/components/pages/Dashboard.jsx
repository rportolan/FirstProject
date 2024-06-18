import SearchBar from "../atoms/SearchBar";
import Select from "../atoms/Select";
const Dashboard = () => {

    return (
      <>
        <div className="flex items-center justify-between">
            <h1 className="ml-12">Mes objectifs</h1>
            <SearchBar placeholder="Search for items..." />
            <div>
                <Select />
                <button className="w-48 mr-14 text-xs h-7 bg-zinc-900 border-zinc-800 border rounded">
                Nouvelle objectif</button>
            </div>
        </div>
      </>
    )
  }
  
  export default Dashboard;