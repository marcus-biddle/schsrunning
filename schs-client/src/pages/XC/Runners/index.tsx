import { useLocation } from "react-router"
import { urlContains } from "../../../helpers"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Athlete, fetchAthletes } from "../../../api/athletes";
import './styled/index.css'
import { SeasonInfo } from "../SeasonInfo";

export const Runners = () => {
    // get the url, check if xc or not then use correct data for page
    const location = useLocation();
    const XCPage: string | null = urlContains(location.pathname, ['cross-country']);
    const genderFilter: string | null= urlContains(location.pathname, ['men', 'women']);
    const [athletes, setAthletes] = useState([]);
    const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (value: string) => {
    setActiveButton(value === activeButton ? '' : value);
};

    useEffect(() => {
        fetchAthletes()
        .then((data: any) => setAthletes(data))
        .catch((error: any) => console.error('Error fetching athletes:', error));
    }, []);

    const filteredAthletes = athletes.filter((athlete: Athlete) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        { XCPage ?
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>SCHS Cross Country Runners (<span>{filteredAthletes.length}</span>)</h2>
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
                    
                </div>
                
                <ol className="list">
                {athletes.filter((athlete: Athlete) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete).map((athlete: Athlete) => (
                    // We can update this accordingly when we have real data with gender and names so we can filter it better
                    <Link 
                    to={athlete.genderId === 2 ? `men/${athlete.athleteId}` : `women/${athlete.athleteId}`}
                    className="spanlinkstyle"
                    >
                        <li key={athlete.athleteId} className="list-item">
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