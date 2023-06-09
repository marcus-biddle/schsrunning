import { useLocation } from "react-router"
import { urlContains } from "../../../helpers"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Athlete, fetchAthletes } from "../../../api/athletes";

export const Runners = () => {
    // get the url, check if xc or not then use correct data for page
    const location = useLocation();
    const XCPage: string | null = urlContains(location.pathname, ['cross-country']);
    const genderFilter: string | null= urlContains(location.pathname, ['men', 'women']);
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        fetchAthletes()
        .then((data: any) => setAthletes(data))
        .catch((error: any) => console.error('Error fetching athletes:', error));
    }, []);

    console.log(genderFilter, athletes.filter((athlete: Athlete) => genderFilter === "women" ? athlete.genderId === 3 : genderFilter === "men" ? athlete.genderId === 2 : athlete));

  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        { XCPage ?
            <>
                <h2>SCHS Cross Country Runners (<span>{athletes.length}</span>) {`- ${genderFilter ? genderFilter : ''}`}</h2>
                {!genderFilter && <div>
                    <span>
                        <Link to={'men/'}>Men</Link>
                    </span>
                    <span>
                        <Link to={'women/'}>Women</Link>
                    </span>
                </div>}
                <ol className="athlete-list">
                {athletes.filter((athlete: Athlete) => genderFilter === "women" ? athlete.genderId === 3 : genderFilter === "men" ? athlete.genderId === 2 : athlete).map((athlete: Athlete) => (
                    // We can update this accordingly when we have real data with gender and names so we can filter it better
                    <Link to={athlete.genderId === 2 ? `men/${athlete.athleteId}` : `women/${athlete.athleteId}`}>
                    <li key={athlete.athleteId} className="athlete-item">
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