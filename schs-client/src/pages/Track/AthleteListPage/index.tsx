import { useLocation } from "react-router"
import { urlContains } from "../../../helpers"
import { Link } from "react-router-dom";
import { useState } from "react";
import { XCAthlete } from "../../../api/athletes";
import { useQuery } from '@tanstack/react-query';
import { TrackAthlete, fetchTrackAthletes } from "../../../api/Track/athletes";

const athleteListQuery = () => ({
    queryKey: ['trackRunners'],
    queryFn: async () => {
        const athletes = await fetchTrackAthletes();
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
}) 

export interface GenderType {
    gender: 'men' | 'women' | 'all';
}

export const AthleteListPage = ({ gender }: { gender: GenderType }) => {
    const [activeButton, setActiveButton] = useState<string>(gender.gender);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: trackRunners } = useQuery(athleteListQuery());
    console.log(trackRunners);

    const handleButtonClick = (value: string) => {
        setActiveButton(value === gender.gender ? activeButton === value ? 'all' : gender.gender : activeButton === value ? 'all' : value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAthletesByGender = trackRunners?.filter((athlete: TrackAthlete) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

    
    const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>SCHS Track & Field Athletes (<span>{filteredAthletesByGender?.length}</span>)</h2>
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
        {filteredAthletesByName?.map((athlete: TrackAthlete) => {
            return (
                <Link 
                to={`${gender.gender === 'all' ? athlete.genderId === 2 ? `men/${athlete.athleteId}` : `women/${athlete.athleteId}` : `${athlete.athleteId}`}`}
                className="spanlinkstyle"
                key={athlete.athleteId}
                >
                    <li className="list-item" style={{ height: '20px'}}>
                        <span>{athlete.firstName} {athlete.lastName}</span>
                    </li>
                </Link>
            )} 
            )}
        </ol>
    </div>
  )
}