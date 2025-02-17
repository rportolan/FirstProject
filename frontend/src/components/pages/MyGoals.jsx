import { useEffect, useState } from 'react';
import SearchBar from "../atoms/SearchBar";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import CardGoal from "../molecules/CardGoal";
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import getApiUrl from '../services/Api';

const MyGoals = () => {
  const token = localStorage.getItem('token');
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    axios.get (getApiUrl('/mygoals'), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setGoals(response.data);
        setFilteredGoals(response.data); // Initialize filtered goals
      })
      .catch(error => {
        console.error("There was an error fetching the goals!", error);
      });
  }, [token]);

  const options = [
    { value: '', label: 'Tous' },
    { value: 'en attente', label: 'En attente' },
    { value: 'en cours', label: 'En cours' },
    { value: 'terminé', label: 'Terminé' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterGoals(query, selectedStatus);
  };

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    filterGoals(searchQuery, status);
  };

  const filterGoals = (query, status) => {
    const filtered = goals.filter(goal => {
      const matchesSearch = goal.name_goal.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === '' || goal.status_goal === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredGoals(filtered);
  };

  return (
    <>
      <div className="md:flex justify-between">
        <h3 className="mb-4 lg:mb-0">Mes objectifs</h3>
        <SearchBar
          placeholder="Rechercher des objectifs..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="flex mt-4 md:mt-0 gap-2">
          <Select
            options={options}
            value={selectedStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
          />
          <RouterLink to={'/newgoal'}>
            <Button>Nouvel objectif</Button>
          </RouterLink>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredGoals.map(goal => (
          <CardGoal
            key={goal.id_goal}
            id={goal.id_goal}
            title={goal.name_goal}
            progress={goal.progress_goal}
          />
        ))}
      </div>
    </>
  );
  
}

export default MyGoals;




