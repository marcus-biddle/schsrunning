
import { Link, useParams } from 'react-router-dom'
import { convertToNum, groupByCoachTypeId } from '../../../helpers';
import { useQuery } from '@tanstack/react-query';
import { fetchCoachById } from '../../../api/Track/coaches';

export const coachQuery = (coachId: number) => ({
    queryKey: ['track-coach', coachId],
    queryFn: async () => {
        const coach = await fetchCoachById(coachId);
        if (!coach) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return coach;
    },
})
// Filter links based on tf or cx
// Use this component for the xc coach page as well
export const TrackCoachPage = () => {
    const { coachId } = useParams();
    const { data: coachData } = useQuery(coachQuery(convertToNum(coachId)));
    // const { data: coaches } = useQuery(coachListQuery());
    const coach = groupByCoachTypeId(coachData || []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>{ coachData && `${coachData[0].firstName} ${coachData[0].lastName}`} </h1>
        {coach && coach.map((season: any, index: number) => {
            return (
                <div key={index}>
                <h4>{season.objects[0].coachType}</h4>
                {season.objects.map((obj: any) => {
                    return (
                        <Link 
                    to={`/santa-clara-high-track-and-field/seasons/${obj.year}`} 
                    key={`${obj.coachType}-${obj.year}`}
                    className='spanlinkstyle'
                    >
                        <li className="list-item">
                            <span>{obj.year}</span>
                        </li>
                    </Link>
                    )
                })}
                </div>
            )
        })}
    </div>
  )
}