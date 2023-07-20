
import { Link } from "react-router-dom";
import { useState } from "react";
import { XCAthlete, fetchXCAthletes } from "../../../api/athletes";
import { useQuery } from '@tanstack/react-query';
import { Header } from "../../../components/Header";
import {Pill} from "../../../components/SearchFeatures/Pill";
import { SearchInput } from "../../../components/SearchFeatures/SearchInput";

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

export const Runners = ({ gender }: { gender: GenderType }) => {
    const [activeButton, setActiveButton] = useState<string>(gender.gender);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: runners } = useQuery(runnerListQuery());

    const handleButtonClick = (value: string) => {
        setActiveButton(value === gender.gender ? activeButton === value ? 'all' : gender.gender : activeButton === value ? 'all' : value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAthletesByGender = runners?.filter((athlete: XCAthlete) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

    const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });
      

  return (
    <div className="page-container">
        <Header title={`SCHS Cross Country Runners (${filteredAthletesByGender?.length})`} color="transparent" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SearchInput handleSearchChange={handleSearchChange} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} />
        </div>
        <p style={{ color: '#007bff', fontWeight: 'bold' }}>{searchTerm !== '' && `Found ${filteredAthletesByName?.length} results...`}</p>
        
        <ol className="list" style={{ columnCount: '2', columnGap: '20px'}}>
        {filteredAthletesByName?.map((athlete: XCAthlete) => (
            <Link 
            to={`${gender.gender === 'all' ? athlete.genderId === 2 ? `men/${athlete.athleteId}` : `women/${athlete.athleteId}` : `${athlete.athleteId}`}`}
            className="spanlinkstyle"
            key={athlete.athleteId}
            >
                <li className="list-item">
                    <span>{athlete.firstName} {athlete.lastName}</span>
                </li>
            </Link>
            
        ))}
        </ol>
    </div>
  )
}