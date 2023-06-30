import { useQuery } from '@tanstack/react-query';
import { fetchAthletes } from '../../api/AllAthletes';
import { Athlete } from '../../api/athletes';
import { useNavigate } from 'react-router';
import AthletesDataTable from '../../components/DataTable/athletes';

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

const AdminDashboard = () => {
    const { data: athletes } = useQuery(athleteListQuery());
    // const [editItem, setEditItem] = useState<Athlete | null>(null);
    const navigate = useNavigate();

      const handleEdit = (item: Athlete) => {
        navigate(`/athlete/${item.athleteId}`);
      };
  return (
    <div>
        <AthletesDataTable data={athletes || []} onEdit={handleEdit} />
    </div>
  )
}

export default AdminDashboard