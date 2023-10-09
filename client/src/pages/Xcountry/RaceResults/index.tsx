import React, { useState } from 'react'
import { GenderType } from '../../../layouts/Xcountry/Runners';
import { useQuery } from '@tanstack/react-query';
import { XCAthleteByRace, fetchXCAthletesByRace } from '../../../api/athletes';
import { useParams } from 'react-router';
import { convertToNum } from '../../../helpers';
import { Link } from 'react-router-dom';
import { SearchInput } from '../../../components/SearchFeatures/SearchInput';
import { Pill } from '../../../components/SearchFeatures/Pill';

const raceResultByRaceListQuery = (raceId: number) => ({
  queryKey: ['race-results', raceId],
  queryFn: async () => {
      const athletes = await fetchXCAthletesByRace(raceId);
      if (!athletes) {
          throw new Response('', {
              status: 404,
              statusText: 'Not Found',
          })
      }
      return athletes;
  },
})

export const loader = (queryClient: any) => async ({ params }: any) => {
  if (!queryClient.getQueryData(raceResultByRaceListQuery(params.raceId).queryKey)) {
      return await queryClient.fetchQuery(raceResultByRaceListQuery(params.raceId));
  }
  return queryClient.getQueriesData(raceResultByRaceListQuery(params.raceId).queryKey);
}

export const RaceResult = ({ gender }: { gender: GenderType }) => {
  const [activeButton, setActiveButton] = useState<string>(gender.gender);
  const [searchTerm, setSearchTerm] = useState('');
  const { raceId } = useParams();
  const { data: raceResultsByRace } = useQuery(raceResultByRaceListQuery(convertToNum(raceId)));

  const handleButtonClick = (value: string) => {
      setActiveButton(value === gender.gender ? activeButton === value ? 'all' : gender.gender : activeButton === value ? 'all' : value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
  };

  const filteredAthletesByGender = raceResultsByRace?.filter((athlete: XCAthleteByRace) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

  const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
      const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
      const searchTermLowerCase = searchTerm.toLowerCase();
      return fullName.includes(searchTermLowerCase);
    });
    

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem', minHeight: '100vh'}}>
        {/* {raceResultsByRace && <Header title={`${raceResultsByRace[0].raceName}: ${raceResultsByRace[0].courseName}, ${raceResultsByRace[0].courseDistance}M (${formatDate(raceResultsByRace[0].date)})`} />} */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SearchInput handleSearchChange={handleSearchChange} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} />
        </div>
        <p style={{ color: '#007bff', fontWeight: 'bold' }}>{searchTerm !== '' && `Found ${filteredAthletesByName?.length} results...`}</p>
        
      
      <ol className="list">
      {filteredAthletesByName?.map((athlete: XCAthleteByRace) => (
          <Link 
          to={`${athlete.genderId === 2 ? `/santa-clara-high-cross-country/runners/men/${athlete.athleteId}` : `/santa-clara-high-cross-country/runners/women/${athlete.athleteId}`}`}
          className="spanlinkstyle"
          key={athlete.athleteId}
          >
              <li className="list-item">
                  <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{athlete.firstName} {athlete.lastName}</span>
                  <span style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '18px'}}>{athlete.time} ({athlete.pace})</span>
              </li>
          </Link>
          
      ))}
      </ol>
    </div>
  )
}

export default RaceResult