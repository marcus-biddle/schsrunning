
import { Link, useParams } from 'react-router-dom'
import { convertToNum } from '../../../helpers';
import { fetchCoach } from '../../../api/coaches';
import { useQuery } from '@tanstack/react-query'
import { coachListQuery } from '../Coaches';

const coachQuery = (coachId: number) => ({
    queryKey: ['coaches', coachId],
    queryFn: async () => {
        const coach = await fetchCoach(coachId);
        if (!coach) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return coach;
    },
})

export const loader = (queryClient: any) => async ({ params }: any) => {
    if (!queryClient.getQueryData(coachQuery(params.coachId).queryKey)) {
      return await queryClient.fetchQuery(coachQuery(params.coachId));
    }
    return queryClient.getQueryData(coachQuery(params.coachId).queryKey);
}

export const CoachPage = () => {
    // const [coachSeasons, setCoachSeasons] = useState<CoachSeason[]>([]);
    // const [coach, setCoach] = useState<Coach>();
    const { coachId } = useParams();
    const { data: coach } = useQuery(coachQuery(convertToNum(coachId)));
    const { data: coaches } = useQuery(coachListQuery());
    console.log(coach);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>{coach?.firstName} {coach?.lastName} </h1>
        { coaches && coaches?.filter((season) => season.coachTypeId === 1 && season.coachId === coach?.coachId).length > 0 &&
        <>
            <h4>Head XC Coach</h4>
            <ol className="list" style={{ columnCount: '2', columnGap: '20x'}}>
                {coaches?.filter((season) => season.coachTypeId === 1 && season.coachId === coach?.coachId).map((coach) => (
                    <Link 
                    to={`/santa-clara-high-cross-country/seasons/${coach.year}`} 
                    key={`${coach.coachId}-${coach.year}`}
                    className='spanlinkstyle'
                    >
                        <li className="list-item">
                            <span>{coach.year}</span>
                        </li>
                    </Link>
                ))}
            </ol>
        </>}
        <h4>Assistant XC Coach</h4>
        <ol className="list" style={{ columnCount: '2', columnGap: '20x'}}>
        {coaches?.filter((season) => season.coachTypeId === 2 && coach?.coachId === season.coachId).map((coach) => (
                <Link 
                to={`/santa-clara-high-cross-country/seasons/${coach.year}`} 
                key={`${coach.coachId}-${coach.year}`}
                className='spanlinkstyle'
                >
                    <li className="list-item">
                        <span>{coach.year}</span>
                    </li>
                </Link>
            ))}
        </ol>
    </div>
  )
}