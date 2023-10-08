
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { XCAthlete, fetchXCAthletes } from "../../../api/athletes";
import { useQuery } from '@tanstack/react-query';
import { SearchInput } from "../../../components/SearchFeatures/SearchInput";
import './styled.css';

const runnerListQuery = () => ({
    queryKey: ['runners'],
    queryFn: async () => {
        const athletes = await fetchXCAthletes();
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
})

// export const loader = (queryClient: any) => async () => {
//     if (!queryClient.getQueryData(runnerListQuery().queryKey)) {
//       return await queryClient.fetchQuery(runnerListQuery());
//     }
//     return queryClient.getQueryData(runnerListQuery().queryKey);
// }

export interface GenderType {
    gender: 'men' | 'women' | 'all';
}

export const Runners = () => {
    // const [activeButton, setActiveButton] = useState<string>(gender.gender);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: runners } = useQuery(runnerListQuery());

    // const handleButtonClick = (value: string) => {
    //     setActiveButton(value === gender.gender ? activeButton === value ? 'all' : gender.gender : activeButton === value ? 'all' : value);
    // };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // const filteredAthletesByGender = runners?.filter((athlete: XCAthlete) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

    const filteredAthletesByName = runners?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });
    console.log(filteredAthletesByName);

  return (
    <div className="xc-athlete-page">
        <div className="top-container">
            <div className="xc-athlete-header">
                <p>Cross Country <span>{'>'}</span> Athletes <span>{'>'}</span></p>
                <h1>Find a Cross Country Athlete</h1>
            {/* <SubHeader title={`Runners (${filteredAthletesByGender?.length})`} color="transparent" /> */}
            {/* <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} /> */}
            </div>
            <div className="xc-athlete-desc">
                <p>Below is every cross country athlete that is on record. If you have a specific athlete you want to find, you can use the search bar below. If a record is missing, <span>please contact admin</span>.</p>
            </div>
            
            <div className="search-container">
                <SearchInput handleSearchChange={handleSearchChange} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                <p>{searchTerm !== '' && `Found ${filteredAthletesByName?.length} results...`}</p>
            </div>
        </div>
        <PaginatedTable data={filteredAthletesByName} />
        {/* <table className="athlete-table">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredAthletesByName?.map((athlete: XCAthlete) => (
      <tr key={athlete.athleteId}>
        <td>{athlete.firstName}</td>
        <td>{athlete.lastName}</td>
        <td>
          <Link to={`runners/${athlete.athleteId}`}>View Details</Link>
        </td>
      </tr>
    ))}
  </tbody>
</table> */}

        {/* <ol className="list">
            {filteredAthletesByName?.map((athlete: XCAthlete) => (
                <Link 
                to={`runners/${athlete.athleteId}`}
                key={athlete.athleteId}
                >
                    <li>
                        <span>{athlete.firstName} {athlete.lastName}</span>
                    </li>
                </Link>
                
            ))}
        </ol> */}
    </div>
  )
}

const itemsPerPage = 10; // Number of items to display per page

const PaginatedTable = ({ data }: any) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages based on data length
    const totalPages = Math.ceil((data ? data.length : 1) / itemsPerPage);
  
    useEffect(() => {
      // If the current page exceeds the total pages, set it to the last page
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [data, currentPage, totalPages]);
  
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Slice the data to display only the items for the current page
    const currentData = data?.slice(startIndex, endIndex);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

  return (
    <div>
        <table className="athlete-table">
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentData?.map((athlete: XCAthlete) => (
                <tr key={athlete.athleteId}>
                    <td>{athlete.firstName}</td>
                    <td>{athlete.lastName}</td>
                    <td>
                    <Link to={`runners/${athlete.athleteId}`}>View Records</Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
