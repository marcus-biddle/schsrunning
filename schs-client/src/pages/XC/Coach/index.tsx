
import { Link, useParams } from 'react-router-dom'
import { CoachSeason, fetchCoachSeason } from '../../../api/coachSeasons';
import { useEffect, useState } from 'react';
import { convertToNum } from '../../../helpers';
import { Coach, fetchCoach } from '../../../api/coaches';

export const CoachPage = () => {
    const [coachSeasons, setCoachSeasons] = useState<CoachSeason[]>([]);
    const [coach, setCoach] = useState<Coach>();
    const { coachId } = useParams();
    const coachIdNum = convertToNum(coachId);

    useEffect(() => {
        fetchCoachSeason(coachIdNum)
            .then((data) => {
                setCoachSeasons(data.filter((row) => row.coachTypeId === 1 || row.coachTypeId === 2));
            })
            .catch((error) => console.error(error));
        
        fetchCoach(coachIdNum)
            .then((data) => {
                setCoach(data);
            })
            .catch((error) => console.error(error));
    }, []);

  return (
    <div style={{ marginRight: '10rem', marginLeft: '10rem'}}>
        <h2>SCHS XC Coach: {coach?.firstName} {coach?.lastName} </h2>
        {coachSeasons.filter((season) => season.coachTypeId === 1).length > 0 &&
        <>
            <h4>Head XC Coach</h4>
            <ol className="list" style={{ columnCount: '2', columnGap: '20x'}}>
                {coachSeasons.filter((season) => season.coachTypeId === 1).map((season) => (
                    <Link 
                    to={`/santa-clara-high-cross-country/seasons/${season.year}`} 
                    key={`${season.coachId}-${season.year}`}
                    className='spanlinkstyle'
                    >
                        <li className="list-item">
                            <span>{season.year}</span>
                        </li>
                    </Link>
                ))}
            </ol>
        </>}
        <h4>Assistant XC Coach</h4>
        <ol className="list" style={{ columnCount: '2', columnGap: '20x'}}>
        {coachSeasons.filter((season) => season.coachTypeId === 2).map((season) => (
                <Link 
                to={`/santa-clara-high-cross-country/seasons/${season.year}`} 
                key={`${season.coachId}-${season.year}`}
                className='spanlinkstyle'
                >
                    <li className="list-item">
                        <span>{season.year}</span>
                    </li>
                </Link>
            ))}
        </ol>
    </div>
  )
}