import { useQuery } from '@tanstack/react-query';
import { Athlete, fetchAthletes } from '../../../api/athletes';
import { useNavigate } from 'react-router';
import AthletesDataTable from '../../../components/DataTable/athletes';
import { useState } from 'react';
import GenericTable from '../../../components/DataTable';

const athleteListQuery = () => ({
    queryKey: ['all-athletes'],
    queryFn: async () => {
        const athletes = await fetchAthletes();
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
})

// separate cross country & track
// basic functions - look at runners, click a runner, view them, make changes there

const buttonStyle = {
  backgroundColor: '#4E9CAF',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
};

const AdminDashboard = () => {
    const { data: athletes } = useQuery(athleteListQuery());
    const [editItem, setEditItem] = useState<Athlete | null>(null);
    const navigate = useNavigate();

    const handleEdit = (key: string) => {
      // navigate(`/admin/athletes/${item.athleteId}`);
      console.log(key)
    };
  return (
    <div>
        {/* <AthletesDataTable data={athletes || []} onEdit={handleEdit} /> */}
        <h1>Directory - Cross Country</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', minHeight: '16rem' }}>
          <div style={{ backgroundColor: '#CCCCCC', width: '100%', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', borderRadius: '16px'}}>
            <h2>Seasons</h2>
            <button style={buttonStyle}>All Seasons</button>
            <p>Click to view all past seasons</p>
            <button style={buttonStyle}>Races By Season</button>
            <p>Click to view all races in a season or to add a new race</p>
          </div>

          <div style={{ backgroundColor: '#CCCCCC', width: '100%', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', borderRadius: '16px'}}>
            <h2>Races</h2>
            <button style={buttonStyle}>All Races</button>
            <p>Click to view all races</p>
            <button style={buttonStyle}>Competitors by Race</button>
            <p>Click to view all competitors in a race or to add a new competitor</p>
          </div>
          <div style={{ backgroundColor: '#CCCCCC', width: '100%', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', borderRadius: '16px'}}>
            <h2>Athletes</h2>
            <button style={buttonStyle}>All Athletes</button>
            <p>Click to view all Athletes</p>
            <button style={buttonStyle}>Add Athlete</button>
            <p>Click to add an Athlete</p>
          </div>
        </div>
        {athletes && <GenericTable data={athletes || []} onEdit={handleEdit} isEditable={true} />}
    </div>
  )
}

export default AdminDashboard