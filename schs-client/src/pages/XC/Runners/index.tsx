import { useLocation } from "react-router"
import { urlContains } from "../../../helpers"
import { Link } from "react-router-dom";
import { useState } from "react";
import { XCAthlete, fetchXCAthletes } from "../../../api/athletes";
import './styled/index.css';
import { useQuery } from '@tanstack/react-query';

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
    // get the url, check if xc or not then use correct data for page
    const location = useLocation();
    const XCPage: string | null = urlContains(location.pathname, ['cross-country']);
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
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        { XCPage ?
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>SCHS Cross Country Runners (<span>{filteredAthletesByGender?.length}</span>)</h2>
                    <div style={{ borderRadius: '8px', marginTop: 'auto', overflow: 'hidden', height: '35px'}}>
                    <button
                        className={`toggle-button ${activeButton === 'men' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('men')}
                    >
                        Men
                    </button>
                    <button
                        className={`toggle-button ${activeButton === 'women' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('women')}
                    >
                        Women
                    </button>
                    </div>
                </div>

                <div>
                <input
                    type="text"
                    placeholder="Search Athletes"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="input"
                />
                <button id="resetButton" type="reset" onClick={() => setSearchTerm('')}>
                    Reset
                </button>
                <span className="search-text">{searchTerm !== '' && `Found ${filteredAthletesByName?.length} runners...`}</span>
                </div>
                
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
            </>
        : 
            ''}
    </div>
  )
}