// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router';
// import GenericTable from '../../../components/DataTable';

// export const athleteListQuery = () => ({
//     queryKey: ['all-athletes'],
//     queryFn: async () => {
//         const athletes = await fetchAthletes();
//         if (!athletes) {
//             throw new Response('', {
//                 status: 404,
//                 statusText: 'Not Found',
//             })
//         }
//         return athletes;
//     },
// })

const AdminAthletesPage = () => {
  //   const { data: athletes } = useQuery(athleteListQuery());
  //   const sortedAthletes = athletes && athletes.sort((a, b) => {
  //       if (b.endHsYear !== a.endHsYear) {
  //         return b.endHsYear - a.endHsYear; // Sort by endHsYear in descending order
  //       } else {
  //         return a.firstName.localeCompare(b.firstName); // Sort by name in ascending order
  //       }
  //     });
      
  //   const navigate = useNavigate();

  //   const handleEdit = (key: any) => {
  //       if (key.athleteId) {
  //           navigate(`/admin/athletes/${key.athleteId}`);
  //       }
  //     console.log(key)
  //   };

  // return (
  //   <div>
  //       <h1>Athletes</h1> 
  //       {/* Todo - separate by sport */}
  //       {athletes && <GenericTable data={sortedAthletes || []} onEdit={handleEdit} isEditable={true} />}
  //   </div>
  // )
}

export default AdminAthletesPage