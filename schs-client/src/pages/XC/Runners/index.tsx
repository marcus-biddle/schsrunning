import { useLocation } from "react-router"
import { urlContains } from "../../../helpers"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { XCAthlete, fetchXCAthletes } from "../../../api/athletes";
import './styled/index.css';

export const Runners = () => {
    // get the url, check if xc or not then use correct data for page
    const location = useLocation();
    const genderType = urlContains(location.pathname, ['men', 'women'])
    const initialButtonPosition = genderType === 'men' ? 'men' : genderType === 'women' ? 'women' : '';
    const XCPage: string | null = urlContains(location.pathname, ['cross-country']);
    const [athletes, setAthletes] = useState<XCAthlete[]>([]);
    const [activeButton, setActiveButton] = useState(initialButtonPosition);
    const [searchTerm, setSearchTerm] = useState('');

  const handleButtonClick = (value: string) => {
    setActiveButton(value === activeButton ? '' : value);
};

    useEffect(() => {
        fetchXCAthletes()
        .then((data: any) => setAthletes(data))
        .catch((error: any) => console.error('Error fetching athletes:', error));
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAthletesByGender = athletes.filter((athlete: XCAthlete) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

    const filteredAthletesByName = filteredAthletesByGender.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });
      

  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        { XCPage ?
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>SCHS Cross Country Runners (<span>{filteredAthletesByGender.length}</span>)</h2>
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
                <span className="search-text">{searchTerm !== '' && `Found ${filteredAthletesByName.length} runners...`}</span>
                </div>
                
                <ol className="list" style={{ columnCount: '2', columnGap: '20px'}}>
                {filteredAthletesByName.map((athlete: XCAthlete) => (
                    <Link 
                    to={genderType === 'men' || genderType === 'women' ? `${athlete.athleteId}/` : athlete.genderId === 2 ? `men/${athlete.athleteId}` : `women/${athlete.athleteId}` }
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