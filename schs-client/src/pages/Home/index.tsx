import ImageCarousel from '../../components/Carousel/index.tsx';
import './styled/index.css';
import { teamImgs } from '../../assets/index.tsx';
import { fetchRecentXCRaceResults } from '../../api/XCRaceResults.ts';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '../../helpers/index.ts';

const recentRaceListQuery = (limit: number) => ({
    queryKey: ['race-results', limit],
    queryFn: async () => {
        const athletes = await fetchRecentXCRaceResults(limit);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
  })

export const Home = () => {
    const { data: athletes } = useQuery(recentRaceListQuery(26));
    console.log(athletes);
    const topRecords = [
        {
            type: 'Men',
            records: [
                {
                    name: 'Cedric Lastname',
                    event: '1600m',
                    result: '4:16.7'
                },
                {
                    name: 'Max Howell',
                    event: '3200m',
                    result: '9:29.2'
                },
                {
                    name: 'Alejandro Martinez',
                    event: '400m',
                    result: '0:55.2'
                },
            ]
        },
        {
            type: 'Women',
            records: [
                {
                    name: 'Jasmine',
                    event: '1600m',
                    result: '4:16.7'
                },
                {
                    name: 'Julie',
                    event: '3200m',
                    result: '9:29.2'
                },
                {
                    name: 'Margaret',
                    event: '400m',
                    result: '0:55.2'
                },
            ]
        },
    ]
  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        {/* Images */}
        <ImageCarousel images={teamImgs} interval={12000} />
        {/* Latest races */}
        <div style={{ marginBottom: '4rem'}}>
            <h2>Latest Race</h2>
            <h4 className="race-details">{athletes && `${athletes[0].courseName}, ${athletes[0].courseDistance}M (${formatDate(athletes[0].date)}`})</h4>
            <ol className="list" style={{ columnCount: '2'}}>
                {athletes && athletes.map((athlete) => (
                    <li key={athlete.competitorId} className="list-item">
                    <span>{athlete.firstName} {athlete.lastName}</span>
                    <span>{athlete.time}</span>
                    </li>
                ))}
            </ol>
        </div>
        {/* <div>
            <h2>Top Athletes</h2>
            <h4 className="race-details">Most recent record breaker: Name - event - time</h4>
            <div className="column-container">
                {topRecords.map((record) => (
                    <div className="column" key={record.type}>
                        <h4 className="record-heading">Top 3 Records - {record.type}</h4>
                        <ul className='top-list'>
                            {record.records.map((athlete) => (
                            <li key={athlete.name} className='top-athlete-item'>
                                <span>{athlete.name}</span>
                                <span>{athlete.event}</span>
                                <span>{athlete.result}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div> */}
        <div>
        <h2 className="latest-race-heading">Latest Updates</h2>
        <p>12/12/21 - added 2021 XC Season</p>
        <p>12/01/21 added 2019 XC Season</p>
        </div>
    </div>
  )
}