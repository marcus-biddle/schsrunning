import { useLocation } from "react-router"
import { urlContains } from "../../../helpers"
import { Link } from "react-router-dom";

export const Runners = () => {
    // get the url, check if xc or not then use correct data for page
    const location = useLocation();
    const XCPage: boolean = urlContains(location.pathname, ['cross-country']);
    const genderFilter: boolean = urlContains(location.pathname, ['men', 'women']);
    const runnerData = [
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 1},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
        { name: 'Example Runner', id: '1001010', gender: 2},
    ]
  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        { XCPage ?
            <>
                <h2>SCHS Cross Country Runners (<span>{runnerData.length}</span>)</h2>
                {!genderFilter && <div>
                    <span>
                        <Link to={'men/'}>Men</Link>
                    </span>
                    <span>
                        <Link to={'women/'}>Women</Link>
                    </span>
                </div>}
                <ol className="athlete-list">
                {runnerData.map((athlete) => (
                    // We can update this accordingly when we have real data with gender and names so we can filter it better
                    <Link to={athlete.gender === 1 ? `men/${athlete.id}` : `women/${athlete.id}`}>
                    <li key={athlete.name} className="athlete-item">
                    <span>{athlete.name}</span>
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